import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useProgressStore } from "./useProgressStore-C8fAoGR_.mjs";
import { P as PageShell, S as SoundToggle } from "./PageShell--bjKwccj.mjs";
import { U as UserAvatar } from "./UserAvatar-DG5E3aJ3.mjs";
import { u as useUserStore } from "./useUserStore-Y8Sy8XcZ.mjs";
import "../_libs/idb.mjs";
import { H as House, T as Trophy, S as Sparkles, G as Gem, a as Shield, b as Star, M as Medal, c as Target } from "../_libs/lucide-react.mjs";
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
import "./router-B1FQr5XI.mjs";
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function RewardsPage() {
  const badges = useProgressStore((s) => s.badges);
  const avatar = useUserStore((s) => s.avatar);
  const BADGE_META = {
    "Tried It": {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6" }),
      blurb: "You showed courage and tried a challenge.",
      tone: "sky"
    },
    "First Win": {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6" }),
      blurb: "Your first successful mission. Big energy!",
      tone: "gold"
    },
    "Move Master": {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "w-6 h-6" }),
      blurb: "You solved it with smart, efficient moves.",
      tone: "emerald"
    },
    "Perfect Run": {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6" }),
      blurb: "Clean win. No mistakes. Pure skill.",
      tone: "violet"
    }
  };
  const toneClass = (tone) => {
    switch (tone) {
      case "gold":
        return "bg-[image:var(--gradient-sunshine)] text-accent-foreground";
      case "emerald":
        return "bg-emerald-500/10 border-emerald-500/30";
      case "violet":
        return "bg-violet-500/10 border-violet-500/30";
      case "sky":
      default:
        return "bg-sky-500/10 border-sky-500/30";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
        " Home"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: "My Trophy Shelf" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { avatarId: avatar, size: "lg", className: "rounded-3xl" }) }),
    badges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border-2 border-dashed border-border p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-12 h-12 mx-auto text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-bold", children: "No badges yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Solve a challenge to earn your first one!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold", children: "Your badges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 text-xs font-extrabold text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
          " ",
          badges.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 grid grid-cols-1 gap-3", children: badges.map((b) => {
        const meta = BADGE_META[b] ?? {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6" }),
          blurb: "A special badge you earned on your journey.",
          tone: "sky"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: ["rounded-3xl border-2 p-4", "shadow-[var(--shadow-soft)]", meta.tone === "gold" ? "border-border" : "bg-card", meta.tone === "gold" ? "bg-[image:var(--gradient-sunshine)] text-accent-foreground" : toneClass(meta.tone)].join(" "), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-black/5 border border-black/10 grid place-items-center", children: meta.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-lg leading-tight", children: b }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold opacity-90", children: meta.blurb })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gem, { className: "w-5 h-5 opacity-70" })
        ] }) }, b);
      }) })
    ] })
  ] }) });
}
export {
  RewardsPage as component
};
