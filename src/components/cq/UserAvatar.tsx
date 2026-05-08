import { cn } from "@/lib/utils";

const AVATAR_MAP: Record<string, { emoji: string; bg: string }> = {
  rocket: { emoji: "🚀", bg: "bg-[image:var(--gradient-primary)]" },
  star: { emoji: "⭐", bg: "bg-[image:var(--gradient-sunshine)]" },
  lion: { emoji: "🦁", bg: "bg-amber-500/15" },
  drum: { emoji: "🥁", bg: "bg-primary/10" },
  book: { emoji: "📘", bg: "bg-sky-500/15" },
  ball: { emoji: "⚽", bg: "bg-emerald-500/15" },
  robot: { emoji: "🤖", bg: "bg-indigo-500/10" },
  fox: { emoji: "🦊", bg: "bg-orange-400/10" },
  cat: { emoji: "🐱", bg: "bg-pink-400/10" },
  owl: { emoji: "🦉", bg: "bg-violet-400/10" },
  butterfly: { emoji: "🦋", bg: "bg-rose-300/10" },
  comet: { emoji: "☄️", bg: "bg-sky-600/10" },
  planet: { emoji: "🪐", bg: "bg-cyan-600/10" },
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
