import { createFileRoute, Link } from "@tanstack/react-router";
import { useGameStore } from "@/store/useGameStore";
import { Mascot } from "@/components/cq/Mascot";
import { Trophy, Home } from "lucide-react";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "My Badges — CodeQuest" },
      { name: "description", content: "All the badges you've collected." },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  const badges = useGameStore((s) => s.badges);

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] p-4">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-4">
          <Link to="/dashboard" className="inline-flex items-center gap-1 font-bold">
            <Home className="w-5 h-5" /> Home
          </Link>
          <h1 className="text-2xl font-extrabold">My Trophy Shelf</h1>
          <span className="w-12" />
        </header>

        <div className="flex justify-center mb-4">
          <Mascot size="lg" />
        </div>

        {badges.length === 0 ? (
          <div className="rounded-3xl bg-card border-2 border-dashed border-border p-8 text-center">
            <Trophy className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="mt-3 font-bold">No badges yet</p>
            <p className="text-sm text-muted-foreground">Solve a challenge to earn your first one!</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <li
                key={b}
                className="rounded-3xl bg-[image:var(--gradient-sunshine)] text-accent-foreground p-4 text-center shadow-[var(--shadow-soft)]"
              >
                <Trophy className="w-10 h-10 mx-auto" />
                <div className="font-extrabold mt-2">{b}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
