import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useProgressStore } from "./useProgressStore-C8fAoGR_.mjs";
import { P as PageShell, S as SoundToggle } from "./PageShell--bjKwccj.mjs";
import { U as UserAvatar } from "./UserAvatar-DG5E3aJ3.mjs";
import { u as useUserStore } from "./useUserStore-Y8Sy8XcZ.mjs";
import { B as BigButton } from "./BigButton-DgHR4ia5.mjs";
import { R as Route$4 } from "./router-B1FQr5XI.mjs";
import "../_libs/idb.mjs";
import { H as House, C as ChevronRight, T as Trophy, L as Lock, P as Play } from "../_libs/lucide-react.mjs";
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
  const avatar = useUserStore((s) => s.avatar);
  const levels = lessons.flatMap((lesson) => (lesson.challenges ?? []).map((c) => ({
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    challengeId: c.id,
    title: c.title,
    type: c.type ?? "grid",
    completed: completedChallenges.includes(c.id)
  })));
  const nextIdx = Math.max(0, levels.findIndex((l) => !l.completed));
  const next = levels[nextIdx] ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
        " Home"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { avatarId: avatar })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "Your Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-semibold mt-1", children: "Follow the path. Each dot is a mission." }),
      next && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lesson/$id", params: {
        id: next.lessonId
      }, search: {
        c: next.challengeId
      }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { className: "w-full", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }), children: "Start next mission" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "relative pl-16 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", className: "absolute left-[32px] top-0 bottom-0 w-[6px] rounded-full bg-[repeating-linear-gradient(180deg,oklch(0.67_0.17_240/0.45)_0px,oklch(0.67_0.17_240/0.45)_20px,transparent_20px,transparent_34px)]" }),
      levels.map((lvl, idx) => {
        const locked = idx > nextIdx;
        const side = idx % 2 === 0 ? "pr-10" : "pl-10";
        const align = idx % 2 === 0 ? "items-start" : "items-end";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: ["relative mb-4 flex", side].join(" "), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-2 top-1.5 w-12 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ["w-10 h-10 rounded-2xl border-2 grid place-items-center", lvl.completed ? "bg-success/10 border-success" : locked ? "bg-muted/30 border-border" : "bg-primary/10 border-primary"].join(" "), children: lvl.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-success" }) : locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ["w-full flex", align].join(" "), children: locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-3xl bg-card/80 border-2 border-border p-4 opacity-80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-semibold", children: [
              "Level ",
              idx + 1,
              " • ",
              lvl.type.toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: lvl.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: lvl.lessonTitle })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lesson/$id", params: {
            id: lvl.lessonId
          }, search: {
            c: lvl.challengeId
          }, className: "block w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-3xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)] hover:border-primary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-semibold", children: [
              "Level ",
              idx + 1,
              " • ",
              lvl.type.toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: lvl.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: lvl.lessonTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs font-extrabold text-primary", children: lvl.completed ? "Replay" : "Play" })
          ] }) }) })
        ] }, `${lvl.lessonId}:${lvl.challengeId}`);
      })
    ] })
  ] }) });
}
export {
  JourneyPage as component
};
