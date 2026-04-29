import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mascot } from "@/components/cq/Mascot";
import { BigButton } from "@/components/cq/BigButton";
import { StatChip } from "@/components/cq/StatChip";
import { ProgressBar } from "@/components/cq/ProgressBar";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { StatsCard } from "@/components/cq/StatsCard";
import { SyncStatus } from "@/components/cq/SyncStatus";
import { PageShell } from "@/components/cq/PageShell";
import { useProgressStore, xpForNextLevel, xpProgress } from "@/store/useProgressStore";
import { useUserStore } from "@/store/useUserStore";
import { fetchLessons, getPrimaryChallenge, type Lesson } from "@/services/lessons";
import {
  getAttemptsForChallenge,
  getAverageTime,
  getEfficiency,
  getSuccessRate,
} from "@/features/progress/selectors";
import { getImprovementHint, getLearningStatus } from "@/features/progress/interpretation";
import { Coins, Sparkles, Trophy, Play, BookOpen, Star, Timer, Rocket, Map, Award } from "lucide-react";
import { queueNarration } from "@/services/narrationQueue";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CodeQuest" },
      { name: "description", content: "Your coding adventure dashboard." },
    ],
  }),
  loader: async () => {
    const lessons = await fetchLessons();
    return lessons;
  },
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const { coins, xp, level, badges, completedScenes } = useProgressStore();
  const attempts = useProgressStore((s) => s.attempts);
  const name = useUserStore((s) => s.name);
  const lessons = Route.useLoaderData() as Lesson[];
  const fallbackLesson = lessons[0];
  const progress = xpProgress(xp);
  const lastAttempt = attempts.length ? attempts[attempts.length - 1] : null;
  const fallbackPrimary = fallbackLesson ? getPrimaryChallenge(fallbackLesson) : null;
  const challengeId = lastAttempt?.challengeId ?? fallbackPrimary?.id ?? "";

  const currentLesson =
    lessons.find((l) => (l.challenges ?? []).some((ch) => ch.id === challengeId)) ?? fallbackLesson;

  const currentChallenge =
    currentLesson?.challenges.find((ch) => ch.id === challengeId) ?? (currentLesson ? getPrimaryChallenge(currentLesson) : null);

  const scenesTotal = currentChallenge?.scenes?.length ?? 0;
  const scenesDone = currentLesson && currentChallenge
    ? completedScenes.filter((k) => k.startsWith(`${currentLesson.id}:${currentChallenge.id}:`)).length
    : 0;

  const successRate = getSuccessRate(attempts, challengeId);
  const avgTimeMs = getAverageTime(attempts, challengeId);
  const efficiency = getEfficiency(attempts, challengeId);
  const attemptsCount = getAttemptsForChallenge(attempts, challengeId).length;
  const status = getLearningStatus(successRate);
  const hint = getImprovementHint(attempts, challengeId);

  const pct = Math.round(successRate * 100);
  const seconds = Math.round(avgTimeMs / 1000);

  return (
    <PageShell>
      <div className="max-w-md mx-auto flex flex-col gap-5">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-semibold">Welcome back!</p>
            <h1 className="text-2xl font-extrabold">Hey, {name} 👋</h1>
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
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-lg">My Learning</h2>
            <Star className="w-5 h-5 text-amber-500" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatsCard label="Success" value={`${pct}%`} icon={<Star className="w-5 h-5 text-amber-500" />} />
            <StatsCard label="Speed" value={`${seconds}s`} icon={<Timer className="w-5 h-5 text-primary" />} />
            <StatsCard label="Moves" value={`${efficiency.toFixed(1)}`} icon={<Rocket className="w-5 h-5 text-success" />} />
            <StatsCard label="Attempts" value={`${attemptsCount}`} icon={<Sparkles className="w-5 h-5 text-primary" />} />
          </div>

          <div className="mt-4 text-center">
            <div className="text-xl font-extrabold">{status}</div>
            <div className="text-sm text-muted-foreground font-semibold">{hint}</div>
          </div>
        </section>

        <section className="rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-extrabold text-lg">Today's Adventure</h2>
            <BookOpen className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="font-bold text-foreground">{currentLesson?.title ?? "No lessons yet"}</p>
          <p className="text-sm text-muted-foreground">{currentLesson?.summary ?? ""}</p>
          <div className="mt-2 text-xs text-muted-foreground">
            {currentLesson ? `${scenesDone}/${scenesTotal} scenes` : ""}
          </div>
          {currentLesson && currentChallenge && (
            <div className="block mt-4">
              <BigButton
                className="w-full"
                icon={<Play className="w-5 h-5" />}
                onClick={() => {
                  queueNarration("Welcome back! Let’s continue your next mission.");
                  navigate({
                    to: "/lesson/$id",
                    params: { id: currentLesson.id },
                    search: { c: currentChallenge.id },
                  });
                }}
              >
                Continue Learning
              </BigButton>
            </div>
          )}
        </section>

        <section>
          <h2 className="font-extrabold mb-2">All Lessons</h2>
          <ul className="flex flex-col gap-2">
            {lessons.map((l) => (
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
                    <div className="text-xs text-muted-foreground">{l.summary}</div>
                  </div>
                  <Play className="w-5 h-5 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link to="/journey" className="block">
            <BigButton className="w-full" icon={<Map className="w-5 h-5" />}>
              Journey Map
            </BigButton>
          </Link>
          <Link to="/rewards" className="block">
            <BigButton variant="accent" className="w-full" icon={<Award className="w-5 h-5" />}>
              My Badges
            </BigButton>
          </Link>
        </section>

        <SyncStatus />
      </div>
    </PageShell>
  );
}
