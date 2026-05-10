import { cn } from "@/lib/utils";
import { AVATAR_IMAGE_BY_ID } from "@/features/onboarding/avatarOptions";

const AVATAR_BACKGROUNDS: Record<string, string> = {
  rocket: "bg-[image:var(--gradient-primary)]",
  star: "bg-[image:var(--gradient-sunshine)]",
  lion: "bg-amber-500/15",
  drum: "bg-primary/10",
  book: "bg-sky-500/15",
  ball: "bg-emerald-500/15",
  robot: "bg-indigo-500/10",
  fox: "bg-orange-400/10",
  cat: "bg-pink-400/10",
  owl: "bg-violet-400/10",
  butterfly: "bg-rose-300/10",
  comet: "bg-sky-600/10",
  planet: "bg-cyan-600/10",
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
  const avatarKey = avatarId && AVATAR_IMAGE_BY_ID[avatarId] ? avatarId : "rocket";
  const src = AVATAR_IMAGE_BY_ID[avatarKey];
  const sizes = {
    sm: "w-10 h-10 text-xl",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
  } as const;

  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-border grid place-items-center shadow-sm",
        AVATAR_BACKGROUNDS[avatarKey],
        sizes[size],
        className,
      )}
      aria-label="Your avatar"
      title="Your avatar"
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="h-full w-full rounded-[inherit] object-cover"
        draggable={false}
      />
    </div>
  );
}
