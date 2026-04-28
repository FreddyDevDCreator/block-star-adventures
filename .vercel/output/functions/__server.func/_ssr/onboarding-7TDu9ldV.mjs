import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as SoundToggle, M as Mascot } from "./SoundToggle-1U5H3jKo.mjs";
import { S as SpeechBubble } from "./SpeechBubble-BqR2kWsb.mjs";
import { B as BigButton } from "./BigButton-DM8Mi3tt.mjs";
import { u as useUserStore } from "./useUserStore-C_YsGkkw.mjs";
import { a as apiFetch } from "./router-Cw9O-Iid.mjs";
import { I as Input } from "./input-BzCYQbAZ.mjs";
import "../_libs/idb.mjs";
import { S as SkipForward, C as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/zustand.mjs";
const ONBOARDING_STEPS = [
  {
    title: "Eiii, welcome!",
    message: "I am Bolt — your coding partner! Together we will reach the moon. Are you ready, my friend?",
    emoji: "👋"
  },
  {
    title: "Read the story",
    message: "Each lesson is a short picture story. Tap Next to see the next panel — easy like that!",
    emoji: "📖"
  },
  {
    title: "Snap the blocks",
    message: "Drag the colourful blocks and connect them together. No writing — just clicking and snapping!",
    emoji: "🧩"
  },
  {
    title: "Win your rewards",
    message: "Finish the challenge and collect coins, points and badges. Show everyone what you can do!",
    emoji: "🏆"
  }
];
async function createUser(payload) {
  return await apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
function OnboardingPage() {
  const {
    name,
    avatar,
    ageGroup
  } = useUserStore();
  const setName = useUserStore((s) => s.setName);
  const [step, setStep] = reactExports.useState(0);
  const finishOnboarding = useUserStore((s) => s.finishOnboarding);
  const setUserId = useUserStore((s) => s.setUserId);
  const userId = useUserStore((s) => s.userId);
  const navigate = useNavigate();
  const current = ONBOARDING_STEPS[step];
  reactExports.useEffect(() => {
  }, []);
  const finish = async () => {
    if (!userId) {
      try {
        const res = await createUser({
          name,
          avatar,
          ageGroup
        });
        setUserId(res.userId);
      } catch {
      }
    }
    finishOnboarding();
    navigate({
      to: "/dashboard"
    });
  };
  const next = () => {
    if (step >= ONBOARDING_STEPS.length - 1) return finish();
    setStep(step + 1);
  };
  const needsName = !name || name.trim() === "" || name === "Explorer";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-[image:var(--gradient-sky)] flex flex-col items-center justify-center p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md flex flex-col items-center gap-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "xl" }),
      needsName ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SpeechBubble, { arrow: "bottom", className: "w-full", speak: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: "👋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "What’s your name?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "So Bolt can call you by your name." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Type your name…", className: "text-center font-bold" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(SpeechBubble, { arrow: "bottom", className: "w-full", speak: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: current.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: current.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: current.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: needsName ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-8 rounded-full bg-primary" }) : ONBOARDING_STEPS.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 rounded-full transition-all ${i === step ? "w-8 bg-primary" : "w-2 bg-border"}` }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { variant: "ghost", className: "flex-1", onClick: finish, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-5 h-5" }), children: "Skip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { className: "flex-[2]", onClick: needsName ? () => setName(name.trim() || "Explorer") : next, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }), disabled: needsName && name.trim().length < 2, children: needsName ? "Continue" : step === ONBOARDING_STEPS.length - 1 ? "Let's go!" : "Next" })
      ] })
    ] })
  ] });
}
export {
  OnboardingPage as component
};
