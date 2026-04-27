// Central game state. Backed by IndexedDB; hydrate() is called once at app
// start so data survives reloads. Using Zustand for minimal boilerplate and
// fine-grained subscriptions.
import { create } from "zustand";
import { defaultProfile, loadProfile, saveProfile, type UserProfile } from "@/services/db";
import { syncProgress } from "@/services/api";

interface GameState extends UserProfile {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setName: (name: string) => void;
  finishOnboarding: () => void;
  awardCoins: (amount: number) => void;
  addXp: (amount: number) => void;
  unlockBadge: (badge: string) => void;
  completeScene: (key: string) => void;
  completeChallenge: (key: string) => void;
  recordAttempt: (key: string) => void;
  toggleSound: () => void;
  reset: () => void;
}

const XP_PER_LEVEL = 100;

function deriveLevel(xp: number) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

/**
 * Extract only the plain-data fields from the Zustand state so that IDB's
 * structured-clone algorithm never sees functions (which it can't clone).
 * GameState extends UserProfile but also carries actions — this strips them.
 */
function toProfile(s: GameState): UserProfile {
  return {
    id: s.id,
    name: s.name,
    level: s.level,
    xp: s.xp,
    coins: s.coins,
    badges: s.badges,
    completedScenes: s.completedScenes,
    completedChallenges: s.completedChallenges,
    attempts: s.attempts,
    onboarded: s.onboarded,
    soundOn: s.soundOn,
  };
}

async function persist(profile: UserProfile) {
  await saveProfile(profile);
  // fire-and-forget mock sync
  void syncProgress(profile);
}

export const useGameStore = create<GameState>((set, get) => ({
  ...defaultProfile,
  hydrated: false,

  hydrate: async () => {
    const data = await loadProfile();
    set({ ...data, hydrated: true });
  },

  setName: (name) => {
    set({ name });
    void persist({ ...toProfile(get()), name });
  },

  finishOnboarding: () => {
    set({ onboarded: true });
    void persist({ ...toProfile(get()), onboarded: true });
  },

  awardCoins: (amount) => {
    const coins = get().coins + amount;
    set({ coins });
    void persist({ ...toProfile(get()), coins });
  },

  addXp: (amount) => {
    const xp = get().xp + amount;
    const level = deriveLevel(xp);
    set({ xp, level });
    void persist({ ...toProfile(get()), xp, level });
  },

  unlockBadge: (badge) => {
    if (get().badges.includes(badge)) return;
    const badges = [...get().badges, badge];
    set({ badges });
    void persist({ ...toProfile(get()), badges });
  },

  completeScene: (key) => {
    if (get().completedScenes.includes(key)) return;
    const completedScenes = [...get().completedScenes, key];
    set({ completedScenes });
    void persist({ ...toProfile(get()), completedScenes });
  },

  completeChallenge: (key) => {
    if (get().completedChallenges.includes(key)) return;
    const completedChallenges = [...get().completedChallenges, key];
    set({ completedChallenges });
    void persist({ ...toProfile(get()), completedChallenges });
  },

  recordAttempt: (key) => {
    const attempts = { ...get().attempts, [key]: (get().attempts[key] ?? 0) + 1 };
    set({ attempts });
    void persist({ ...toProfile(get()), attempts });
  },

  toggleSound: () => {
    const soundOn = !get().soundOn;
    set({ soundOn });
    void persist({ ...toProfile(get()), soundOn });
  },

  reset: () => {
    set({ ...defaultProfile, hydrated: true });
    void persist(defaultProfile);
  },
}));

export const xpForNextLevel = (xp: number) => XP_PER_LEVEL - (xp % XP_PER_LEVEL);
export const xpProgress = (xp: number) => (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
