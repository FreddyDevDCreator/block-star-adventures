import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useProgressStore } from "./useProgressStore-BCPEjS5H.mjs";
import { P as PageShell, S as SoundToggle, M as Mascot } from "./PageShell-Bw4skdIS.mjs";
import "../_libs/idb.mjs";
import { H as House, T as Trophy } from "../_libs/lucide-react.mjs";
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
import "./router-yaET50bD.mjs";
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function RewardsPage() {
  const badges = useProgressStore((s) => s.badges);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
        " Home"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "My Trophy Shelf" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "lg" }) }),
    badges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border-2 border-dashed border-border p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-12 h-12 mx-auto text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-bold", children: "No badges yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Solve a challenge to earn your first one!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-3", children: badges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-3xl bg-[image:var(--gradient-sunshine)] text-accent-foreground p-4 text-center shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-10 h-10 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold mt-2", children: b })
    ] }, b)) })
  ] }) });
}
export {
  RewardsPage as component
};
