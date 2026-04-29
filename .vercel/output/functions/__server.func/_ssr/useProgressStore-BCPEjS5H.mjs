import { h as defaultProfile, j as persistProfilePatch, l as loadProfile } from "./router-yaET50bD.mjs";
import { c as create } from "../_libs/zustand.mjs";
const XP_PER_LEVEL = 100;
function deriveLevel(xp) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}
const useProgressStore = create((set, get) => ({
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
      progressHydrated: true
    });
  },
  awardCoins: (amount) => {
    const coins = get().coins + amount;
    set({ coins });
    void persistProfilePatch({ coins }, {});
  },
  addXp: (amount) => {
    const xp = get().xp + amount;
    const level = deriveLevel(xp);
    set({ xp, level });
    void persistProfilePatch({ xp, level }, {});
  },
  unlockBadge: (badge) => {
    if (get().badges.includes(badge)) return;
    const badges = [...get().badges, badge];
    set({ badges });
    void persistProfilePatch({ badges }, {});
  },
  completeScene: (key) => {
    if (get().completedScenes.includes(key)) return;
    const completedScenes = [...get().completedScenes, key];
    set({ completedScenes });
    void persistProfilePatch({ completedScenes }, {});
  },
  completeChallenge: (key) => {
    if (get().completedChallenges.includes(key)) return;
    const completedChallenges = [...get().completedChallenges, key];
    set({ completedChallenges });
    void persistProfilePatch({ completedChallenges }, {});
  },
  recordAttempt: (attempt) => {
    const attempts = [...get().attempts, attempt];
    set({ attempts });
    void persistProfilePatch({ attempts }, {});
  },
  setAttempts: (attempts) => {
    set({ attempts });
    void persistProfilePatch({ attempts }, {});
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
      progressHydrated: true
    });
    void persistProfilePatch(
      {
        level: defaultProfile.level,
        xp: defaultProfile.xp,
        coins: defaultProfile.coins,
        badges: defaultProfile.badges,
        completedScenes: defaultProfile.completedScenes,
        completedChallenges: defaultProfile.completedChallenges,
        attempts: defaultProfile.attempts
      },
      {}
    );
  }
}));
const xpForNextLevel = (xp) => XP_PER_LEVEL - xp % XP_PER_LEVEL;
const xpProgress = (xp) => xp % XP_PER_LEVEL / XP_PER_LEVEL;
export {
  xpProgress as a,
  useProgressStore as u,
  xpForNextLevel as x
};
