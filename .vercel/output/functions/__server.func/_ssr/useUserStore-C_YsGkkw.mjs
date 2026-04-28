import { d as defaultProfile, a as persistProfilePatch, l as loadProfile } from "./SoundToggle-1U5H3jKo.mjs";
import { c as create } from "../_libs/zustand.mjs";
const useUserStore = create((set) => ({
  userId: defaultProfile.userId,
  name: defaultProfile.name,
  avatar: defaultProfile.avatar,
  ageGroup: defaultProfile.ageGroup,
  onboarded: defaultProfile.onboarded,
  userHydrated: false,
  hydrateUser: async () => {
    const profile = await loadProfile();
    set({
      userId: profile.userId,
      name: profile.name,
      avatar: profile.avatar,
      ageGroup: profile.ageGroup,
      onboarded: profile.onboarded,
      userHydrated: true
    });
  },
  setUserId: (userId) => {
    set({ userId });
    void persistProfilePatch({ userId }, {});
  },
  setName: (name) => {
    set({ name });
    void persistProfilePatch({ name }, {});
  },
  setAvatar: (avatar) => {
    set({ avatar });
    void persistProfilePatch({ avatar }, {});
  },
  setAgeGroup: (ageGroup) => {
    set({ ageGroup });
    void persistProfilePatch({ ageGroup }, {});
  },
  finishOnboarding: () => {
    set({ onboarded: true });
    void persistProfilePatch({ onboarded: true }, {});
  },
  resetUser: () => {
    set({
      userId: defaultProfile.userId,
      name: defaultProfile.name,
      avatar: defaultProfile.avatar,
      ageGroup: defaultProfile.ageGroup,
      onboarded: defaultProfile.onboarded,
      userHydrated: true
    });
    void persistProfilePatch(
      {
        userId: defaultProfile.userId,
        name: defaultProfile.name,
        avatar: defaultProfile.avatar,
        ageGroup: defaultProfile.ageGroup,
        onboarded: defaultProfile.onboarded
      },
      {}
    );
  }
}));
export {
  useUserStore as u
};
