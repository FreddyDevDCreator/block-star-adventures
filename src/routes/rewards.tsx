import { createFileRoute, Link } from "@tanstack/react-router";
import { useProgressStore } from "@/store/useProgressStore";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { Gem, Home, Medal, Shield, Sparkles, Star, Target, Trophy } from "lucide-react";
import { PageShell } from "@/components/cq/PageShell";
import { UserAvatar } from "@/components/cq/UserAvatar";
import { useUserStore } from "@/store/useUserStore";

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

  const BADGE_META: Record<
    string,
    { icon: React.ReactNode; blurb: string; tone: "gold" | "sky" | "emerald" | "violet" }
  > = {
    "Tried It": {
      icon: <Target className="w-6 h-6" />,
      blurb: "You showed courage and tried a challenge.",
      tone: "sky",
    },
    "First Win": {
      icon: <Trophy className="w-6 h-6" />,
      blurb: "Your first successful mission. Big energy!",
      tone: "gold",
    },
    "Move Master": {
      icon: <Medal className="w-6 h-6" />,
      blurb: "You solved it with smart, efficient moves.",
      tone: "emerald",
    },
    "Perfect Run": {
      icon: <Star className="w-6 h-6" />,
      blurb: "Clean win. No mistakes. Pure skill.",
      tone: "violet",
    },
  };

  const toneClass = (tone: "gold" | "sky" | "emerald" | "violet") => {
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

  return (
    <PageShell>
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-4">
          <Link to="/dashboard" className="inline-flex items-center gap-1 font-bold">
            <Home className="w-5 h-5" /> Home
          </Link>
          <h1 className="text-2xl font-extrabold">My Trophy Shelf</h1>
          <SoundToggle />
        </header>

        <div className="flex justify-center mb-4">
          <UserAvatar avatarId={avatar} size="lg" className="rounded-3xl" />
        </div>

        {badges.length === 0 ? (
          <div className="rounded-3xl bg-card border-2 border-dashed border-border p-8 text-center">
            <Trophy className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="mt-3 font-bold">No badges yet</p>
            <p className="text-sm text-muted-foreground">Solve a challenge to earn your first one!</p>
          </div>
        ) : (
          <div className="rounded-3xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div className="font-extrabold">Your badges</div>
              <div className="inline-flex items-center gap-1 text-xs font-extrabold text-muted-foreground">
                <Sparkles className="w-4 h-4" /> {badges.length}
              </div>
            </div>

            <ul className="mt-3 grid grid-cols-1 gap-3">
              {badges.map((b) => {
                const meta =
                  BADGE_META[b] ??
                  ({
                    icon: <Shield className="w-6 h-6" />,
                    blurb: "A special badge you earned on your journey.",
                    tone: "sky",
                  } as const);

                return (
                  <li
                    key={b}
                    className={[
                      "rounded-3xl border-2 p-4",
                      "shadow-[var(--shadow-soft)]",
                      meta.tone === "gold" ? "border-border" : "bg-card",
                      meta.tone === "gold" ? "bg-[image:var(--gradient-sunshine)] text-accent-foreground" : toneClass(meta.tone),
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/10 grid place-items-center">
                        {meta.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-extrabold text-lg leading-tight">{b}</div>
                        <div className="text-sm font-semibold opacity-90">{meta.blurb}</div>
                      </div>
                      <Gem className="w-5 h-5 opacity-70" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </PageShell>
  );
}
