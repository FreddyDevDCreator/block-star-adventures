import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./SoundToggle-1U5H3jKo.mjs";
const variants = {
  primary: "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-pop)] hover:brightness-110 active:scale-[0.97]",
  accent: "bg-[image:var(--gradient-sunshine)] text-accent-foreground shadow-[var(--shadow-pop)] hover:brightness-110 active:scale-[0.97]",
  success: "bg-success text-success-foreground shadow-[var(--shadow-pop)] hover:brightness-110 active:scale-[0.97]",
  ghost: "bg-card text-foreground border-2 border-border hover:bg-secondary active:scale-[0.97]"
};
const BigButton = reactExports.forwardRef(
  ({ className, variant = "primary", icon, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      ref,
      ...props,
      className: cn(
        "inline-flex items-center justify-center gap-2 min-h-14 px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      ),
      children: [
        icon,
        children
      ]
    }
  )
);
BigButton.displayName = "BigButton";
export {
  BigButton as B
};
