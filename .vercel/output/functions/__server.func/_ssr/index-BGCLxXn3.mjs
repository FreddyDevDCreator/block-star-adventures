import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useSettingsStore, s as speak, S as SoundToggle, M as Mascot, p as playSfx } from "./SoundToggle-1U5H3jKo.mjs";
import { u as useProgressStore } from "./useProgressStore-X9ivf4wL.mjs";
import { u as useUserStore } from "./useUserStore-C_YsGkkw.mjs";
import { s as syncAttempts } from "./sync-BiFh2rn-.mjs";
import { B as BigButton } from "./BigButton-DM8Mi3tt.mjs";
import "../_libs/idb.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zustand.mjs";
import "./router-Cw9O-Iid.mjs";
function LoadingScreen() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-[image:var(--gradient-sky)] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-extrabold text-xl", children: "CodeQuest" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Loading your adventure…" })
  ] }) });
}
function useAppHydration() {
  const [isHydrated, setIsHydrated] = reactExports.useState(false);
  const hydrateUser = useUserStore((s) => s.hydrateUser);
  const hydrateProgress = useProgressStore((s) => s.hydrateProgress);
  const hydrateSettings = useSettingsStore((s) => s.hydrateSettings);
  reactExports.useEffect(() => {
    let alive = true;
    async function hydrate() {
      await Promise.all([hydrateUser(), hydrateProgress(), hydrateSettings()]);
      if (alive) setIsHydrated(true);
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
function Index() {
  const isHydrated = useAppHydration();
  const soundOn = useSettingsStore((s) => s.soundOn);
  const onboarded = useUserStore((s) => s.onboarded);
  reactExports.useEffect(() => {
    if (!isHydrated) return;
    if (!soundOn) return;
    speak("Eiii! Let’s go on an adventure!");
  }, [isHydrated, soundOn]);
  if (!isHydrated) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh bg-[image:var(--gradient-sky)] p-4 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: "Block Star Adventures" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-card border-2 border-border p-6 shadow-[var(--shadow-soft)] text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "xl" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm font-semibold", children: "“Eiii! Let’s go on an adventure!” 🚀" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-3xl font-extrabold leading-tight", children: "Learn coding by helping Bolt the rocket 🚀" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground font-semibold", children: "A playful, offline-friendly coding adventure for kids — built to grow confidence, problem‑solving, and creativity." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-left rounded-2xl bg-card/50 border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: "For parents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 text-sm text-muted-foreground font-semibold space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Bite-sized coding missions with instant feedback" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Progress saved automatically (works without internet)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Attempts + learning insights to show improvement over time" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: onboarded ? "/dashboard" : "/onboarding", className: "block mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { className: "w-full", onClick: () => {
        playSfx("click");
        if (soundOn) speak("Let’s go!");
      }, children: "Start Learning" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground font-semibold", children: "Offline-first • Works without internet • Your progress saves automatically" })
  ] }) });
}
export {
  Index as component
};
