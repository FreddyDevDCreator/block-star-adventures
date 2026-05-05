import { cn } from "@/lib/utils";

const AVATAR_MAP: Record<string, { emoji: string; bg: string }> = {
  rocket: { emoji: "🚀", bg: "bg-[image:var(--gradient-primary)]" },
  star: { emoji: "⭐", bg: "bg-[image:var(--gradient-sunshine)]" },
  lion: { emoji: "🦁", bg: "bg-amber-500/15" },
  drum: { emoji: "🥁", bg: "bg-primary/10" },
  book: { emoji: "📘", bg: "bg-sky-500/15" },
  ball: { emoji: "⚽", bg: "bg-emerald-500/15" },
};

export function UserAvatar({
  avatarId,
  size = "md",
  className,
}: {
  avatarId?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const a = AVATAR_MAP[avatarId ?? ""] ?? AVATAR_MAP.rocket;
  const sizes = {
    sm: "w-10 h-10 text-xl",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
  } as const;

  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-border grid place-items-center shadow-sm",
        a.bg,
        sizes[size],
        className,
      )}
      aria-label="Your avatar"
      title="Your avatar"
    >
      <span className="leading-none">{a.emoji}</span>
    </div>
  );
}

