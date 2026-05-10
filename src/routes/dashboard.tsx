import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mascot } from "@/components/cq/Mascot";
import { BigButton } from "@/components/cq/BigButton";
import { StatChip } from "@/components/cq/StatChip";
import { ProgressBar } from "@/components/cq/ProgressBar";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { StatsCard } from "@/components/cq/StatsCard";
import { SyncStatus } from "@/components/cq/SyncStatus";
import { PageShell } from "@/components/cq/PageShell";
import { UserAvatar } from "@/components/cq/UserAvatar";
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
import {
  Coins,
  Sparkles,
  Trophy,
  Play,
  BookOpen,
  Star,
  Timer,
  Rocket,
  Map,
  Award,
} from "lucide-react";
import { queueNarration } from "@/services/narrationQueue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useCallback, useMemo } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Block Star Adventures" },
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
  const soundOn = useSettingsStore((s) => s.soundOn);

  // Subscribe to only the fields this screen needs.
  // Note: this repo's Zustand hooks don't use equality fns (like shallow) in the call signature.
  const coins = useProgressStore((s) => s.coins);
  const xp = useProgressStore((s) => s.xp);
  const level = useProgressStore((s) => s.level);
  const badgesCount = useProgressStore((s) => s.badges.length);
  const completedScenes = useProgressStore((s) => s.completedScenes);
  const attempts = useProgressStore((s) => s.attempts);
  const name = useUserStore((s) => s.name);
  const avatar = useUserStore((s) => s.avatar);
  const safeName = useMemo(() => {
    const trimmed = name?.trim() ?? "";
    return trimmed && trimmed !== "Explorer" ? trimmed : "Explorer";
  }, [name]);
  const lessons = Route.useLoaderData() as Lesson[];
  const fallbackLesson = lessons[0];
  const levelProgress = useMemo(() => xpProgress(xp), [xp]);

  const {
    currentLesson,
    currentChallenge,
    scenesDone,
    scenesTotal,
    efficiency,
    attemptsCount,
    status,
    hint,
    pct,
    seconds,
  } = useMemo(() => {
    const lastAttempt = attempts.length ? attempts[attempts.length - 1] : null;
    const fallbackPrimary = fallbackLesson ? getPrimaryChallenge(fallbackLesson) : null;
    const challengeId = lastAttempt?.challengeId ?? fallbackPrimary?.id ?? "";

    const currentLessonLocal =
      lessons.find((l) => (l.challenges ?? []).some((ch) => ch.id === challengeId)) ??
      fallbackLesson;

    const currentChallengeLocal =
      currentLessonLocal?.challenges.find((ch) => ch.id === challengeId) ??
      (currentLessonLocal ? getPrimaryChallenge(currentLessonLocal) : null);

    const scenesTotalLocal = currentChallengeLocal?.scenes?.length ?? 0;
    const scenesDoneLocal =
      currentLessonLocal && currentChallengeLocal
        ? completedScenes.filter((k) =>
            k.startsWith(`${currentLessonLocal.id}:${currentChallengeLocal.id}:`),
          ).length
        : 0;

    const successRateLocal = getSuccessRate(attempts, challengeId);
    const avgTimeMsLocal = getAverageTime(attempts, challengeId);
    const efficiencyLocal = getEfficiency(attempts, challengeId);
    const attemptsCountLocal = getAttemptsForChallenge(attempts, challengeId).length;
    const statusLocal = getLearningStatus(successRateLocal);
    const hintLocal = getImprovementHint(attempts, challengeId);

    return {
      currentLesson: currentLessonLocal,
      currentChallenge: currentChallengeLocal,
      scenesDone: scenesDoneLocal,
      scenesTotal: scenesTotalLocal,
      efficiency: efficiencyLocal,
      attemptsCount: attemptsCountLocal,
      status: statusLocal,
      hint: hintLocal,
      pct: Math.round(successRateLocal * 100),
      seconds: Math.round(avgTimeMsLocal / 1000),
    };
  }, [attempts, completedScenes, fallbackLesson, lessons]);

  const handleGoJourney = useCallback(() => {
    if (soundOn) queueNarration("Let’s look at the journey map!");
    navigate({ to: "/journey" });
  }, [navigate, soundOn]);

  const handleGoRewards = useCallback(() => {
    if (soundOn) queueNarration("These are your badges. Great work!");
    navigate({ to: "/rewards" });
  }, [navigate, soundOn]);

  const handleContinue = useCallback(() => {
    if (!currentLesson || !currentChallenge) return;
    if (soundOn) queueNarration("Welcome back! Let’s continue your next mission.");
    navigate({
      to: "/lesson/$id",
      params: { id: currentLesson.id },
      search: { c: currentChallenge.id },
    });
  }, [currentChallenge, currentLesson, navigate, soundOn]);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-xl flex flex-col gap-5 sm:gap-6">
        <header className="flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground font-semibold">Welcome back!</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Hey, {safeName} <span aria-hidden="true">👋</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <SoundToggle className="w-11 h-11" />
            <UserAvatar avatarId={avatar} />
          </div>
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-5 sm:p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h2 className="font-extrabold text-lg sm:text-xl">Today’s Adventure</h2>
            <BookOpen className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
          </div>

          <p className="font-extrabold text-foreground text-base sm:text-lg">
            {currentLesson?.title ?? "No lessons yet"}
          </p>
          {currentLesson?.summary ? (
            <p className="mt-1 text-sm sm:text-base text-muted-foreground font-semibold">
              {currentLesson.summary}
            </p>
          ) : null}

          {currentLesson && currentChallenge ? (
            <div className="mt-3 grid gap-3">
              <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground font-semibold">
                <span>
                  Scene {Math.min(scenesDone + 1, scenesTotal || 1)} of {Math.max(scenesTotal, 1)}
                </span>
                <span>{scenesTotal ? `${scenesDone}/${scenesTotal} done` : ""}</span>
              </div>

              <BigButton
                className="w-full animate-[pulse-glow_2.2s_ease-in-out_infinite]"
                icon={<Play className="w-5 h-5" aria-hidden="true" />}
                onClick={handleContinue}
              >
                Continue Learning
              </BigButton>
            </div>
          ) : (
            <div className="mt-4">
              <BigButton
                className="w-full"
                variant="ghost"
                icon={<Map className="w-5 h-5" aria-hidden="true" />}
                onClick={handleGoJourney}
              >
                Open Journey Map
              </BigButton>
            </div>
          )}
        </section>

        <section className="rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-4">
            <Mascot size="sm" className="shrink-0" />
            <SpeechBubble className="flex-1" arrow="left">
              <div className="font-extrabold text-base sm:text-lg">{status}</div>
              <div className="mt-1 text-sm sm:text-base text-muted-foreground font-semibold">
                {hint}
              </div>
            </SpeechBubble>
          </div>
        </section>

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
          <ProgressBar value={levelProgress} className="mt-3" />
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <StatChip
            icon={<Coins className="w-5 h-5 text-amber-500" aria-hidden="true" />}
            label="Coins"
            value={coins}
          />
          <StatChip
            icon={<Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />}
            label="XP"
            value={xp}
          />
          <StatChip
            className="col-span-2 sm:col-span-1 justify-center"
            icon={<Trophy className="w-5 h-5 text-success" aria-hidden="true" />}
            label="Badges"
            value={badgesCount}
          />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BigButton
            className="w-full"
            variant="ghost"
            icon={<Map className="w-5 h-5" aria-hidden="true" />}
            onClick={handleGoJourney}
          >
            Journey Map
          </BigButton>
          <BigButton
            variant="accent"
            className="w-full"
            icon={<Award className="w-5 h-5" aria-hidden="true" />}
            onClick={handleGoRewards}
          >
            My Badges
          </BigButton>
        </section>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="stats" className="border-0">
            <AccordionTrigger className="rounded-2xl bg-card border-2 border-border px-4 hover:no-underline">
              <span className="font-extrabold">My Stats</span>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="grid grid-cols-2 gap-3">
                <StatsCard
                  label="Success"
                  value={`${pct}%`}
                  icon={<Star className="w-5 h-5 text-amber-500" aria-hidden="true" />}
                />
                <StatsCard
                  label="Speed"
                  value={`${seconds}s`}
                  icon={<Timer className="w-5 h-5 text-primary" aria-hidden="true" />}
                />
                <StatsCard
                  label="Moves"
                  value={`${Number.isFinite(efficiency) ? efficiency.toFixed(1) : "0.0"}`}
                  icon={<Rocket className="w-5 h-5 text-success" aria-hidden="true" />}
                />
                <StatsCard
                  label="Attempts"
                  value={`${attemptsCount}`}
                  icon={<Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="lessons" className="border-0 mt-3">
            <AccordionTrigger className="rounded-2xl bg-card border-2 border-border px-4 hover:no-underline">
              <span className="flex items-center gap-2">
                <span className="font-extrabold">Explore Lessons</span>
                <span className="text-xs text-muted-foreground font-semibold">
                  ({lessons.length})
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <ul className="flex flex-col gap-2">
                {lessons.map((l) => (
                  <li key={l.id}>
                    <Link
                      to="/lesson/$id"
                      params={{ id: l.id }}
                      search={{ c: undefined }}
                      aria-label={`Open lesson: ${l.title}`}
                      className={
                        "flex items-center gap-3 rounded-2xl bg-card border-2 border-border p-3 " +
                        "hover:border-primary transition-colors " +
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      }
                    >
                      <div
                        className="w-12 h-12 rounded-xl bg-[image:var(--gradient-primary)] grid place-items-center text-2xl"
                        aria-hidden="true"
                      >
                        <span aria-hidden="true">🚀</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold truncate">{l.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {l.summary}
                        </div>
                      </div>
                      <Play
                        className="w-5 h-5 text-primary shrink-0 self-center"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SyncStatus />
      </div>
    </PageShell>
  );
}
