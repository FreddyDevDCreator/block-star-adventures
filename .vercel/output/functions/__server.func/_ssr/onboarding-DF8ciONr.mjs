import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell, S as SoundToggle, M as Mascot } from "./PageShell-Bw4skdIS.mjs";
import { S as SpeechBubble } from "./SpeechBubble-Brt-1PBX.mjs";
import { B as BigButton } from "./BigButton-D5Q9Sy0z.mjs";
import { u as useUserStore } from "./useUserStore-BRLEj0QK.mjs";
import { a as apiFetch } from "./router-yaET50bD.mjs";
import { I as Input } from "./input-etptacRL.mjs";
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
    message: "I’m Bolt — your rocket buddy! Today we’re helping learn to code with Bolt. Ready to take your first flight across Africa’s sky?",
    emoji: "👋"
  },
  {
    title: "Meet the story",
    message: "Every lesson is like a mini-comic. Coach will show the next scene, and you’ll level up step by step. Tap Next to continue!",
    emoji: "📖"
  },
  {
    title: "Snap the blocks",
    message: "Drag the colourful blocks and snap them together like beads on a necklace. No long writing — just play, learn, and try again!",
    emoji: "🧩"
  },
  {
    title: "Win your rewards",
    message: "Finish the mission and collect coins, XP, and badges. Your progress will save automatically — even when there is no internet.",
    emoji: "🏆"
  }
];
async function createUser(payload) {
  return await apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
const AVATARS = [{
  id: "rocket",
  label: "Rocket",
  emoji: "🚀"
}, {
  id: "star",
  label: "Star",
  emoji: "⭐"
}, {
  id: "lion",
  label: "Lion",
  emoji: "🦁"
}, {
  id: "drum",
  label: "Drum",
  emoji: "🥁"
}, {
  id: "book",
  label: "Book",
  emoji: "📘"
}, {
  id: "ball",
  label: "Ball",
  emoji: "⚽"
}];
function OnboardingPage() {
  const {
    name,
    avatar,
    ageGroup
  } = useUserStore();
  const setName = useUserStore((s) => s.setName);
  const setAvatar = useUserStore((s) => s.setAvatar);
  const setAgeGroup = useUserStore((s) => s.setAgeGroup);
  const [step, setStep] = reactExports.useState(0);
  const finishOnboarding = useUserStore((s) => s.finishOnboarding);
  const setUserId = useUserStore((s) => s.setUserId);
  const userId = useUserStore((s) => s.userId);
  const navigate = useNavigate();
  const setupSteps = 3;
  const storyIndex = step - setupSteps;
  const inStory = storyIndex >= 0;
  const current = inStory ? ONBOARDING_STEPS[storyIndex] : null;
  const totalSteps = setupSteps + ONBOARDING_STEPS.length;
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
    if (step >= totalSteps - 1) return finish();
    setStep(step + 1);
  };
  const isNameStep = step === 0;
  const isAvatarStep = step === 1;
  const isAgeStep = step === 2;
  const nameTrimmed = name.trim();
  const nameIsValid = Boolean(nameTrimmed.length >= 2 && nameTrimmed !== "Explorer");
  const avatarIsValid = Boolean(avatar && avatar.trim().length > 0);
  const ageIsValid = ageGroup === "kid" || ageGroup === "teen";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { className: "items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md flex flex-col items-center gap-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "xl" }),
      isNameStep ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SpeechBubble, { arrow: "bottom", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: "👋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "What’s your name, hero?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "So Bolt can call you in his rocket crew." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Type your name…", className: "text-center font-bold" }) })
      ] }) : isAvatarStep ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SpeechBubble, { arrow: "bottom", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: "🎭" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Pick your avatar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Choose a badge for your crew card." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-3 gap-2", children: AVATARS.map((a) => {
          const active = avatar === a.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setAvatar(a.id), className: ["rounded-2xl border-2 p-3 min-h-14 font-extrabold transition-colors", "bg-card", active ? "border-primary bg-primary/10" : "border-border hover:border-primary/60"].join(" "), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl", children: a.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground font-bold", children: a.label })
          ] }, a.id);
        }) })
      ] }) : isAgeStep ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SpeechBubble, { arrow: "bottom", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: "🎒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "How old are you?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "This helps us pick the right level of hints." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setAgeGroup("kid"), className: ["rounded-2xl border-2 px-5 py-4 min-h-14 font-extrabold text-left transition-colors", ageGroup === "kid" ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"].join(" "), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base", children: "6–11 years" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-bold", children: "Kid" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setAgeGroup("teen"), className: ["rounded-2xl border-2 px-5 py-4 min-h-14 font-extrabold text-left transition-colors", ageGroup === "teen" ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"].join(" "), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base", children: "12–16 years" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-bold", children: "Teen" })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(SpeechBubble, { arrow: "bottom", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-1", children: current?.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: current?.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: current?.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: Array.from({
        length: totalSteps
      }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 rounded-full transition-all ${idx === step ? "w-8 bg-primary" : "w-2 bg-border"}` }, idx)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { variant: "ghost", className: "flex-1", onClick: finish, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-5 h-5" }), children: "Skip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { className: "flex-[2]", onClick: isNameStep ? () => {
          setName(nameTrimmed || "Explorer");
          next();
        } : next, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }), disabled: isNameStep && !nameIsValid || isAvatarStep && !avatarIsValid || isAgeStep && !ageIsValid, children: isNameStep ? "Continue" : step === totalSteps - 1 ? "Let's go!" : "Next" })
      ] })
    ] }) })
  ] });
}
export {
  OnboardingPage as component
};
