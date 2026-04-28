import { create } from "zustand";
import { defaultProfile, loadProfile, type Attempt } from "@/services/db";
import { persistProfilePatch } from "./profilePersistence";

export type { Attempt };

interface ProgressState {
  level: number;
  xp: number;
  coins: number;
  badges: string[];
  completedScenes: string[];
  completedChallenges: string[];
  attempts: Attempt[];
  syncStatus: "idle" | "syncing" | "synced" | "offline";
  progressHydrated: boolean;
  hydrateProgress: () => Promise<void>;
  awardCoins: (amount: number) => void;
  addXp: (amount: number) => void;
  unlockBadge: (badge: string) => void;
  completeScene: (key: string) => void;
  completeChallenge: (key: string) => void;
  recordAttempt: (attempt: Attempt) => void;
  setAttempts: (attempts: Attempt[]) => void;
  setSyncStatus: (status: "idle" | "syncing" | "synced" | "offline") => void;
  resetProgress: () => void;
}

const XP_PER_LEVEL = 100;

function deriveLevel(xp: number) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  level: defaultProfile.level,
  xp: defaultProfile.xp,
  coins: defaultProfile.coins,
  badges: defaultProfile.badges,
  completedScenes: defaultProfile.completedScenes,
  completedChallenges: defaultProfile.completedChallenges,
  attempts: defaultProfile.attempts,
  syncStatus: "idle",
  progressHydrated: false,

  hydrateProgress: async () => {
    const profile = await loadProfile();
    set({
      level: profile.level,
      xp: profile.xp,
      coins: profile.coins,
      badges: profile.badges,
      completedScenes: profile.completedScenes,
      completedChallenges: profile.completedChallenges,
      attempts: profile.attempts,
      progressHydrated: true,
    });
  },

  awardCoins: (amount) => {
    const coins = get().coins + amount;
    set({ coins });
    void persistProfilePatch({ coins }, { sync: true });
  },

  addXp: (amount) => {
    const xp = get().xp + amount;
    const level = deriveLevel(xp);
    set({ xp, level });
    void persistProfilePatch({ xp, level }, { sync: true });
  },

  unlockBadge: (badge) => {
    if (get().badges.includes(badge)) return;
    const badges = [...get().badges, badge];
    set({ badges });
    void persistProfilePatch({ badges }, { sync: true });
  },

  completeScene: (key) => {
    if (get().completedScenes.includes(key)) return;
    const completedScenes = [...get().completedScenes, key];
    set({ completedScenes });
    void persistProfilePatch({ completedScenes }, { sync: true });
  },

  completeChallenge: (key) => {
    if (get().completedChallenges.includes(key)) return;
    const completedChallenges = [...get().completedChallenges, key];
    set({ completedChallenges });
    void persistProfilePatch({ completedChallenges }, { sync: true });
  },

  recordAttempt: (attempt) => {
    const attempts = [...get().attempts, attempt];
    set({ attempts });
    void persistProfilePatch({ attempts }, { sync: true });
  },

  setAttempts: (attempts) => {
    set({ attempts });
    void persistProfilePatch({ attempts }, { sync: true });
  },

  setSyncStatus: (syncStatus) => {
    set({ syncStatus });
  },

  resetProgress: () => {
    set({
      level: defaultProfile.level,
      xp: defaultProfile.xp,
      coins: defaultProfile.coins,
      badges: defaultProfile.badges,
      completedScenes: defaultProfile.completedScenes,
      completedChallenges: defaultProfile.completedChallenges,
      attempts: defaultProfile.attempts,
      syncStatus: "idle",
      progressHydrated: true,
    });
    void persistProfilePatch(
      {
        level: defaultProfile.level,
        xp: defaultProfile.xp,
        coins: defaultProfile.coins,
        badges: defaultProfile.badges,
        completedScenes: defaultProfile.completedScenes,
        completedChallenges: defaultProfile.completedChallenges,
        attempts: defaultProfile.attempts,
      },
      { sync: true },
    );
  },
}));

export const xpForNextLevel = (xp: number) => XP_PER_LEVEL - (xp % XP_PER_LEVEL);
export const xpProgress = (xp: number) => (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
