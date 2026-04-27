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
  reset: () => void;
}

const XP_PER_LEVEL = 100;

function deriveLevel(xp: number) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

async function persist(state: UserProfile) {
  await saveProfile(state);
  // fire-and-forget mock sync
  void syncProgress(state);
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
    void persist({ ...(get() as UserProfile), name });
  },

  finishOnboarding: () => {
    set({ onboarded: true });
    void persist({ ...(get() as UserProfile), onboarded: true });
  },

  awardCoins: (amount) => {
    const coins = get().coins + amount;
    set({ coins });
    void persist({ ...(get() as UserProfile), coins });
  },

  addXp: (amount) => {
    const xp = get().xp + amount;
    const level = deriveLevel(xp);
    set({ xp, level });
    void persist({ ...(get() as UserProfile), xp, level });
  },

  unlockBadge: (badge) => {
    if (get().badges.includes(badge)) return;
    const badges = [...get().badges, badge];
    set({ badges });
    void persist({ ...(get() as UserProfile), badges });
  },

  completeScene: (key) => {
    if (get().completedScenes.includes(key)) return;
    const completedScenes = [...get().completedScenes, key];
    set({ completedScenes });
    void persist({ ...(get() as UserProfile), completedScenes });
  },

  completeChallenge: (key) => {
    if (get().completedChallenges.includes(key)) return;
    const completedChallenges = [...get().completedChallenges, key];
    set({ completedChallenges });
    void persist({ ...(get() as UserProfile), completedChallenges });
  },

  recordAttempt: (key) => {
    const attempts = { ...get().attempts, [key]: (get().attempts[key] ?? 0) + 1 };
    set({ attempts });
    void persist({ ...(get() as UserProfile), attempts });
  },

  reset: () => {
    set({ ...defaultProfile, hydrated: true });
    void persist(defaultProfile);
  },
}));

export const xpForNextLevel = (xp: number) => XP_PER_LEVEL - (xp % XP_PER_LEVEL);
export const xpProgress = (xp: number) => (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
