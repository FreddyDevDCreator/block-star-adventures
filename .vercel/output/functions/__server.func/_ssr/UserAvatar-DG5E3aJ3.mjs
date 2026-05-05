import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./PageShell--bjKwccj.mjs";
const AVATAR_MAP = {
  rocket: { emoji: "🚀", bg: "bg-[image:var(--gradient-primary)]" },
  star: { emoji: "⭐", bg: "bg-[image:var(--gradient-sunshine)]" },
  lion: { emoji: "🦁", bg: "bg-amber-500/15" },
  drum: { emoji: "🥁", bg: "bg-primary/10" },
  book: { emoji: "📘", bg: "bg-sky-500/15" },
  ball: { emoji: "⚽", bg: "bg-emerald-500/15" }
};
function UserAvatar({
  avatarId,
  size = "md",
  className
}) {
  const a = AVATAR_MAP[avatarId ?? ""] ?? AVATAR_MAP.rocket;
  const sizes = {
    sm: "w-10 h-10 text-xl",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "rounded-2xl border-2 border-border grid place-items-center shadow-sm",
        a.bg,
        sizes[size],
        className
      ),
      "aria-label": "Your avatar",
      title: "Your avatar",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-none", children: a.emoji })
    }
  );
}
export {
  UserAvatar as U
};
