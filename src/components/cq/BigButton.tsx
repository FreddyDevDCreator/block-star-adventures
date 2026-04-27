import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "accent" | "ghost" | "success";

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-pop)] hover:brightness-110 active:scale-[0.97]",
  accent:
    "bg-[image:var(--gradient-sunshine)] text-accent-foreground shadow-[var(--shadow-pop)] hover:brightness-110 active:scale-[0.97]",
  success:
    "bg-success text-success-foreground shadow-[var(--shadow-pop)] hover:brightness-110 active:scale-[0.97]",
  ghost:
    "bg-card text-foreground border-2 border-border hover:bg-secondary active:scale-[0.97]",
};

export const BigButton = forwardRef<HTMLButtonElement, BigButtonProps>(
  ({ className, variant = "primary", icon, children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 min-h-14 px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </button>
  ),
);
BigButton.displayName = "BigButton";
