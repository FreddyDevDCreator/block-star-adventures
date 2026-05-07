import { createFileRoute, Link } from "@tanstack/react-router";
import { useProgressStore } from "@/store/useProgressStore";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { Gem, Home, Medal, Shield, Sparkles, Star, Target, Trophy } from "lucide-react";
import { PageShell } from "@/components/cq/PageShell";
import { UserAvatar } from "@/components/cq/UserAvatar";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeTone = "gold" | "primary" | "success" | "secondary";

const BADGE_META: Record<string, { icon: ReactNode; blurb: string; tone: BadgeTone }> = {
  "Tried It": {
    icon: <Target className="w-6 h-6" aria-hidden="true" />,
    blurb: "You showed courage and tried a challenge.",
    tone: "primary",
  },
  "First Win": {
    icon: <Trophy className="w-6 h-6" aria-hidden="true" />,
    blurb: "Your first successful mission. Big energy!",
    tone: "gold",
  },
  "Move Master": {
    icon: <Medal className="w-6 h-6" aria-hidden="true" />,
    blurb: "You solved it with smart, efficient moves.",
    tone: "success",
  },
  "Perfect Run": {
    icon: <Star className="w-6 h-6" aria-hidden="true" />,
    blurb: "Clean win. No mistakes. Pure skill.",
    tone: "secondary",
  },
};

function badgeToneClasses(tone: BadgeTone) {
  switch (tone) {
    case "gold":
      return {
        card: "bg-[image:var(--gradient-sunshine)] text-accent-foreground border-border",
        iconWrap: "bg-black/5 border border-black/10",
        chip: "bg-black/10 text-accent-foreground border-black/10",
      };
    case "success":
      return {
        card: "bg-card text-card-foreground border-success/30",
        iconWrap: "bg-success/15 border-success/20 text-success",
        chip: "bg-success/15 text-success-foreground border-success/25",
      };
    case "secondary":
      return {
        card: "bg-card text-card-foreground border-border",
        iconWrap: "bg-secondary border-border",
        chip: "bg-secondary text-secondary-foreground border-border",
      };
    case "primary":
    default:
      return {
        card: "bg-card text-card-foreground border-primary/25",
        iconWrap: "bg-primary/10 border-primary/15 text-primary",
        chip: "bg-primary/10 text-foreground border-primary/15",
      };
  }
}

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "My Badges — Block Star Adventures" },
      { name: "description", content: "All the badges you've collected." },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  const badges = useProgressStore((s) => s.badges);
  const avatar = useUserStore((s) => s.avatar);

  const badgeCountLabel = badges.length === 1 ? "1 badge" : `${badges.length} badges`;

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-xl flex flex-col gap-5 sm:gap-6">
        <header className="flex items-center justify-between gap-2 min-w-0">
          <Link
            to="/dashboard"
            className={
              "inline-flex items-center gap-2 font-extrabold " +
              "h-11 px-3 rounded-xl border-2 border-border bg-card shadow-[var(--shadow-soft)] " +
              "hover:border-primary/60 transition-colors " +
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            }
          >
            <Home className="w-5 h-5" aria-hidden="true" /> Dashboard
          </Link>

          <h1 className="font-extrabold text-lg sm:text-xl truncate">Rewards</h1>

          <div className="flex items-center gap-2 shrink-0">
            <SoundToggle className="w-11 h-11" />
            <UserAvatar avatarId={avatar} />
          </div>
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-5 sm:p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground font-semibold">YOUR TROPHY SHELF</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="text-3xl sm:text-4xl font-extrabold">{badges.length}</div>
                <div className="text-sm sm:text-base text-muted-foreground font-semibold">
                  {badgeCountLabel}
                </div>
              </div>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground font-semibold">
                Earn badges by completing missions and solving coding challenges.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-[image:var(--gradient-sunshine)] text-accent-foreground border-2 border-border w-12 h-12 grid place-items-center shadow-[var(--shadow-soft)]">
              <Trophy className="w-6 h-6" aria-hidden="true" />
            </div>
          </div>
        </section>

        {badges.length === 0 ? (
          <section className="rounded-3xl bg-card border-2 border-dashed border-border p-8 text-center shadow-[var(--shadow-soft)]">
            <Trophy className="w-12 h-12 mx-auto text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-extrabold">No badges yet</h2>
            <p className="mt-1 text-sm text-muted-foreground font-semibold">
              Solve a challenge to earn your first one.
            </p>
            <div className="mt-5">
              <Link
                to="/journey"
                className={
                  "inline-flex items-center justify-center rounded-2xl border-2 border-border bg-card " +
                  "h-12 px-5 font-extrabold shadow-[var(--shadow-soft)] " +
                  "hover:border-primary/60 transition-colors " +
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                }
              >
                Explore the Journey
              </Link>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl bg-card border-2 border-border p-4 sm:p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-extrabold">Your badges</h2>
              <div className="inline-flex items-center gap-1 text-xs font-extrabold text-muted-foreground">
                <Sparkles className="w-4 h-4" aria-hidden="true" /> {badges.length}
              </div>
            </div>

            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Badge list">
              {badges.map((badgeName) => {
                const meta =
                  BADGE_META[badgeName] ??
                  ({
                    icon: <Shield className="w-6 h-6" aria-hidden="true" />,
                    blurb: "A special badge you earned on your journey.",
                    tone: "primary",
                  } as const);

                const tone = badgeToneClasses(meta.tone);

                return (
                  <li
                    key={badgeName}
                    className={cn(
                      "rounded-3xl border-2 p-4",
                      "shadow-[var(--shadow-soft)]",
                      "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
                      tone.card,
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl grid place-items-center border",
                          tone.iconWrap,
                        )}
                        aria-hidden="true"
                      >
                        {meta.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-extrabold text-lg leading-tight truncate">
                            {badgeName}
                          </div>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full border px-2 py-1",
                              "text-[11px] font-extrabold",
                              tone.chip,
                            )}
                          >
                            <Gem className="w-3.5 h-3.5" aria-hidden="true" />
                            Unlocked
                          </span>
                        </div>
                        <div className="mt-1 text-sm font-semibold text-muted-foreground">
                          {meta.blurb}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </PageShell>
  );
}
