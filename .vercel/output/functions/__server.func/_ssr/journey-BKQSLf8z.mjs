import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useProgressStore } from "./useProgressStore-BCPEjS5H.mjs";
import { P as PageShell, S as SoundToggle, M as Mascot } from "./PageShell-Bw4skdIS.mjs";
import { R as Route$4 } from "./router-yaET50bD.mjs";
import "../_libs/idb.mjs";
import { H as House, T as Trophy, P as Play } from "../_libs/lucide-react.mjs";
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
function JourneyPage() {
  const lessons = Route$4.useLoaderData();
  const completedChallenges = useProgressStore((s) => s.completedChallenges);
  const levels = lessons.flatMap((lesson) => (lesson.challenges ?? []).map((c) => ({
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    challengeId: c.id,
    title: c.title,
    type: c.type ?? "grid",
    completed: completedChallenges.includes(c.id)
  })));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
        " Home"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "md" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Your Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-semibold mt-1", children: "Pick a mission and level up your coding skills." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: levels.map((lvl, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/lesson/$id", params: {
      id: lvl.lessonId
    }, search: {
      c: lvl.challengeId
    }, className: ["flex items-center gap-3 rounded-2xl bg-card border-2 border-border p-3 transition-colors", "hover:border-primary"].join(" "), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-[image:var(--gradient-primary)] grid place-items-center text-xl", children: lvl.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-semibold", children: [
          "Level ",
          idx + 1,
          " • ",
          lvl.type.toUpperCase()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: lvl.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: lvl.lessonTitle })
      ] }),
      lvl.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-success", children: "DONE" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-primary", children: "PLAY" })
    ] }) }, `${lvl.lessonId}:${lvl.challengeId}`)) })
  ] }) });
}
export {
  JourneyPage as component
};
