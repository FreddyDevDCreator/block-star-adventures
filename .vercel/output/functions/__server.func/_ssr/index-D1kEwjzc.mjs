import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell, S as SoundToggle, M as Mascot } from "./PageShell-Bw4skdIS.mjs";
import { u as useProgressStore } from "./useProgressStore-BCPEjS5H.mjs";
import { u as useSettingsStore, p as playSfx, q as queueNarration } from "./router-yaET50bD.mjs";
import { u as useUserStore } from "./useUserStore-BRLEj0QK.mjs";
import { s as syncAttempts } from "./sync-BR5zIOMN.mjs";
import { B as BigButton } from "./BigButton-D5Q9Sy0z.mjs";
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
  const navigate = useNavigate();
  if (!isHydrated) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg", children: "Block Star Adventures" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-card border-2 border-border p-6 shadow-[var(--shadow-soft)] text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "xl" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm font-semibold", children: "“Eiii! Let’s go on an adventure!” 🚀" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-3xl font-extrabold leading-tight", children: "Learn coding with Bolt — from Africa’s sky to the Moon 🚀" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground font-semibold", children: "A playful, offline-friendly coding adventure for African kids — built to grow confidence, problem-solving, and creativity." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-left rounded-2xl bg-card/50 border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: "For parents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 text-sm text-muted-foreground font-semibold space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Bite-sized missions with instant feedback (like a story game)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Progress saved automatically (works without internet)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Attempts + learning insights that show improvement over time" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { className: "w-full", onClick: () => {
        playSfx("click");
        if (soundOn) queueNarration("Eiii! Welcome! I’m Bolt. Tap next and follow me!");
        navigate({
          to: onboarded ? "/dashboard" : "/onboarding"
        });
      }, children: "Start Learning" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground font-semibold", children: "Offline-first • Works without internet • Your progress saves automatically" })
  ] }) });
}
export {
  Index as component
};
