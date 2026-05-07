import { useEffect, useState } from "react";
import { useProgressStore } from "@/store/useProgressStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useUserStore } from "@/store/useUserStore";
import { syncAttempts } from "@/services/sync";

export function useAppHydration(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  const hydrateUser = useUserStore((s) => s.hydrateUser);
  const hydrateProgress = useProgressStore((s) => s.hydrateProgress);
  const hydrateSettings = useSettingsStore((s) => s.hydrateSettings);

  useEffect(() => {
    let alive = true;
    async function hydrate() {
      await Promise.all([hydrateUser(), hydrateProgress(), hydrateSettings()]);
      if (alive) setIsHydrated(true);

      // Fire-and-forget sync after startup hydration.
      const userId = useUserStore.getState().userId;
      if (userId) void syncAttempts(userId);
    }
    void hydrate();
    return () => {
      alive = false;
    };
  }, [hydrateProgress, hydrateSettings, hydrateUser]);

  return isHydrated;
}
