import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { k as Route, g as getPrimaryChallenge, q as queueNarration, n as narrate } from "./router-yaET50bD.mjs";
import { P as PageShell, S as SoundToggle, M as Mascot } from "./PageShell-Bw4skdIS.mjs";
import { S as SpeechBubble } from "./SpeechBubble-Brt-1PBX.mjs";
import { B as BigButton } from "./BigButton-D5Q9Sy0z.mjs";
import { u as useProgressStore } from "./useProgressStore-BCPEjS5H.mjs";
import "../_libs/idb.mjs";
import { H as House, f as ChevronLeft, g as CodeXml, C as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function LessonPage() {
  const {
    lesson,
    lessons
  } = Route.useLoaderData();
  const [i, setI] = reactExports.useState(0);
  const completeScene = useProgressStore((s) => s.completeScene);
  const addXp = useProgressStore((s) => s.addXp);
  const navigate = useNavigate();
  const {
    c
  } = Route.useSearch();
  const primary = getPrimaryChallenge(lesson);
  const selected = c ? lesson.challenges.find((ch) => ch.id === c) ?? null : primary;
  const selectedChallengeId = selected?.id ?? primary?.id ?? "";
  const scenes = selected?.scenes ?? [];
  const scene = scenes[i];
  const isLast = i === scenes.length - 1;
  const worldIndex = lessons.findIndex((l) => l.id === lesson.id);
  const worldNumber = worldIndex >= 0 ? worldIndex + 1 : 1;
  const levelIndex = lesson.challenges.findIndex((ch) => ch.id === selectedChallengeId);
  const levelNumber = levelIndex >= 0 ? levelIndex + 1 : 1;
  reactExports.useEffect(() => {
    setI(0);
  }, [selectedChallengeId]);
  const goNext = () => {
    completeScene(`${lesson.id}:${selectedChallengeId}:${i}`);
    addXp(5);
    if (isLast) {
      queueNarration("Nice! Now it’s your turn. Let’s code!");
      navigate({
        to: "/play/$id",
        params: {
          id: lesson.id
        },
        search: selectedChallengeId ? {
          c: selectedChallengeId
        } : void 0
      });
    } else {
      const nextIdx = i + 1;
      setI(nextIdx);
      const nextText = scenes[nextIdx]?.text;
      if (nextText) void narrate(nextText);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 font-bold text-foreground/80 hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
          " Home"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground font-semibold", children: [
          "World ",
          worldNumber,
          " • Level ",
          levelNumber
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: scenes.map((_s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-2 bg-border"}` }, idx)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-muted-foreground", children: [
          Math.min(i + 1, Math.max(1, scenes.length)),
          "/",
          Math.max(1, scenes.length)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 px-4 pb-4 flex flex-col items-center justify-center max-w-md mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-3xl border-4 border-card shadow-[var(--shadow-pop)] bg-card p-6 animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-semibold", children: "SCENE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xl font-extrabold", children: scene?.speaker ?? "Coach" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base font-bold text-foreground", children: scene?.text ?? "Loading…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-end gap-3 w-full animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "sm", bob: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SpeechBubble, { className: "flex-1", children: scene?.text ?? "" })
      ] }, `b-${i}`)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "p-4 flex gap-3 max-w-md mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { variant: "ghost", onClick: () => setI(Math.max(0, i - 1)), disabled: i === 0, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" }), className: "flex-1", children: "Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { onClick: goNext, icon: isLast ? /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }), className: "flex-[2]", children: isLast ? "Start coding!" : "Next" })
    ] })
  ] });
}
export {
  LessonPage as component
};
