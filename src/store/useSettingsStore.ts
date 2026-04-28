import { create } from "zustand";
import { defaultProfile, loadProfile } from "@/services/db";
import { persistProfilePatch } from "./profilePersistence";

interface SettingsState {
  soundOn: boolean;
  settingsHydrated: boolean;
  hydrateSettings: () => Promise<void>;
  toggleSound: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  soundOn: defaultProfile.soundOn,
  settingsHydrated: false,

  hydrateSettings: async () => {
    const profile = await loadProfile();
    set({ soundOn: profile.soundOn, settingsHydrated: true });
  },

  toggleSound: () => {
    const soundOn = !get().soundOn;
    set({ soundOn });
    void persistProfilePatch({ soundOn });
  },
}));
