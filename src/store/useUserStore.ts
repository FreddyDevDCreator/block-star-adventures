import { create } from "zustand";
import { defaultProfile, loadProfile } from "@/services/db";
import { persistProfilePatch } from "./profilePersistence";

interface UserState {
  userId?: string;
  name: string;
  avatar: string;
  ageGroup: "kid" | "teen";
  onboarded: boolean;
  userHydrated: boolean;
  hydrateUser: () => Promise<void>;
  setUserId: (id: string) => void;
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  setAgeGroup: (ageGroup: "kid" | "teen") => void;
  finishOnboarding: () => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
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
      userHydrated: true,
    });
  },

  setUserId: (userId) => {
    set({ userId });
    void persistProfilePatch({ userId }, { sync: true });
  },

  setName: (name) => {
    set({ name });
    void persistProfilePatch({ name }, { sync: true });
  },

  setAvatar: (avatar) => {
    set({ avatar });
    void persistProfilePatch({ avatar }, { sync: true });
  },

  setAgeGroup: (ageGroup) => {
    set({ ageGroup });
    void persistProfilePatch({ ageGroup }, { sync: true });
  },

  finishOnboarding: () => {
    set({ onboarded: true });
    void persistProfilePatch({ onboarded: true }, { sync: true });
  },

  resetUser: () => {
    set({
      userId: defaultProfile.userId,
      name: defaultProfile.name,
      avatar: defaultProfile.avatar,
      ageGroup: defaultProfile.ageGroup,
      onboarded: defaultProfile.onboarded,
      userHydrated: true,
    });
    void persistProfilePatch(
      {
        userId: defaultProfile.userId,
        name: defaultProfile.name,
        avatar: defaultProfile.avatar,
        ageGroup: defaultProfile.ageGroup,
        onboarded: defaultProfile.onboarded,
      },
      { sync: true },
    );
  },
}));
