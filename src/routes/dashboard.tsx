import { createFileRoute, Link } from "@tanstack/react-router";
import { Mascot } from "@/components/cq/Mascot";
import { BigButton } from "@/components/cq/BigButton";
import { StatChip } from "@/components/cq/StatChip";
import { ProgressBar } from "@/components/cq/ProgressBar";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { useGameStore, xpForNextLevel, xpProgress } from "@/store/useGameStore";
import { LESSONS, firstLesson } from "@/features/lessons/lessonData";
import { Coins, Sparkles, Trophy, Play, BookOpen } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CodeQuest" },
      { name: "description", content: "Your coding adventure dashboard." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { coins, xp, level, badges, completedScenes } = useGameStore();
  const lesson = firstLesson();
  const progress = xpProgress(xp);

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] p-4 sm:p-6">
      <div className="max-w-md mx-auto flex flex-col gap-5">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-semibold">Welcome back!</p>
            <h1 className="text-2xl font-extrabold">Hey, Explorer 👋</h1>
          </div>
          <div className="flex items-center gap-2">
            <SoundToggle />
            <Mascot size="md" />
          </div>
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground font-semibold">LEVEL</div>
              <div className="text-4xl font-extrabold text-primary">{level}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground font-semibold">NEXT LEVEL</div>
              <div className="font-bold">{xpForNextLevel(xp)} XP</div>
            </div>
          </div>
          <ProgressBar value={progress} className="mt-3" />
        </section>

        <div className="grid grid-cols-3 gap-2">
          <StatChip icon={<Coins className="w-5 h-5 text-amber-500" />} label="Coins" value={coins} />
          <StatChip icon={<Sparkles className="w-5 h-5 text-primary" />} label="XP" value={xp} />
          <StatChip icon={<Trophy className="w-5 h-5 text-success" />} label="Badges" value={badges.length} />
        </div>

        <section className="rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-extrabold text-lg">Today's Adventure</h2>
            <BookOpen className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="font-bold text-foreground">{lesson.title}</p>
          <p className="text-sm text-muted-foreground">{lesson.subtitle}</p>
          <div className="mt-2 text-xs text-muted-foreground">
            {completedScenes.filter((k) => k.startsWith(lesson.id)).length}/{lesson.scenes.length} scenes
          </div>
          <Link to="/lesson/$id" params={{ id: lesson.id }} className="block mt-4">
            <BigButton className="w-full" icon={<Play className="w-5 h-5" />}>
              Continue Learning
            </BigButton>
          </Link>
        </section>

        <section>
          <h2 className="font-extrabold mb-2">All Lessons</h2>
          <ul className="flex flex-col gap-2">
            {LESSONS.map((l) => (
              <li key={l.id}>
                <Link
                  to="/lesson/$id"
                  params={{ id: l.id }}
                  className="flex items-center gap-3 rounded-2xl bg-card border-2 border-border p-3 hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[image:var(--gradient-primary)] grid place-items-center text-2xl">
                    🚀
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{l.title}</div>
                    <div className="text-xs text-muted-foreground">{l.subtitle}</div>
                  </div>
                  <Play className="w-5 h-5 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Link to="/rewards" className="self-center text-sm font-bold text-primary underline-offset-4 hover:underline">
          View my badges →
        </Link>
      </div>
    </div>
  );
}
