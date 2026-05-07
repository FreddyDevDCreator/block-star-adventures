import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useState } from "react";
import {
  fetchLesson,
  getPrimaryChallenge,
  isGridChallenge,
  isQuizChallenge,
  type Lesson,
} from "@/services/lessons";
import { BigButton } from "@/components/cq/BigButton";
import { Mascot } from "@/components/cq/Mascot";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { GridSim } from "@/features/blockly/GridSim";
import { simulate, type Step } from "@/features/blockly/simulator";
import { RewardModal } from "@/components/cq/RewardModal";
import { useProgressStore } from "@/store/useProgressStore";
import { computeReward } from "@/features/progress/rewards";
import { syncAttempts } from "@/services/sync";
import { useUserStore } from "@/store/useUserStore";
import { SyncStatus } from "@/components/cq/SyncStatus";
import { PageShell } from "@/components/cq/PageShell";
import { Home, Lightbulb, Play, RotateCcw } from "lucide-react";
import { narrate, playSfx, unlockAudio } from "@/services/audio";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { fetchLessons, getNextLevel } from "@/services/lessons";
import { queueNarration } from "@/services/narrationQueue";
import { SwapCupsExplainer } from "@/components/cq/SwapCupsExplainer";

// Blockly is heavy — lazy load so it stays out of the main bundle.
const BlocklyWorkspace = lazy(() => import("@/features/blockly/BlocklyWorkspace"));

export const Route = createFileRoute("/play/$id")({
  head: () => ({
    meta: [
      { title: "Coding Challenge — Block Star Adventures" },
      { name: "description", content: "Drag blocks to solve the challenge." },
    ],
  }),
  loader: async ({ params }) => {
    try {
      return await fetchLesson(params.id);
    } catch {
      throw notFound();
    }
  },
  validateSearch: (search: Record<string, unknown>) => {
    return {
      c: typeof search.c === "string" ? search.c : undefined,
    };
  },
  component: PlayPage,
});

// ── Directional feedback helper ─────────────────────────────────────────────
// Uses warm African English expressions so the voice feels familiar to kids.
function directionalFeedback(finalPos: Step, goalPos: Step): string {
  const dx = finalPos.x - goalPos.x;
  const dy = finalPos.y - goalPos.y;
  const lines: string[] = [];

  if (dx > 0)
    lines.push(
      `Chai! You went ${dx} step${dx > 1 ? "s" : ""} too far to the right. Remove ${dx} Move Right block${dx > 1 ? "s" : ""} and try again!`,
    );
  else if (dx < 0)
    lines.push(
      `Eii! You need ${-dx} more step${-dx > 1 ? "s" : ""} to the right. Add ${-dx} Move Right block${-dx > 1 ? "s" : ""} and run again!`,
    );

  if (dy > 0)
    lines.push(
      `You went ${dy} step${dy > 1 ? "s" : ""} too high. Remove ${dy} Move Up block${dy > 1 ? "s" : ""}, my friend!`,
    );
  else if (dy < 0)
    lines.push(
      `You need ${-dy} more step${-dy > 1 ? "s" : ""} going up. Add ${-dy} Move Up block${-dy > 1 ? "s" : ""} — you are almost there!`,
    );

  return lines.length
    ? lines.join(" ")
    : "Hmm! Try small changes: add one block, then run again. You’ve got this!";
}

function PlayPage() {
  const lesson = Route.useLoaderData() as Lesson;
  const { c } = Route.useSearch() as { c?: string };
  const challenge =
    (c ? lesson.challenges.find((ch) => ch.id === c) : null) ?? getPrimaryChallenge(lesson);
  if (!challenge) {
    throw new Error(`Invalid lesson payload: no challenges. lessonId=${lesson.id}`);
  }
  const isGrid = isGridChallenge(challenge);
  const isQuiz = isQuizChallenge(challenge);

  const startStep: Step =
    isGrid && challenge.start ? { x: challenge.start.x, y: challenge.start.y } : { x: 0, y: 0 };
  const gridSize = isGrid
    ? Math.max(
        4,
        challenge.grid?.width ?? 0,
        challenge.grid?.height ?? 0,
        startStep.x + 1,
        startStep.y + 1,
        (challenge.goalPos?.x ?? 0) + 1,
        (challenge.goalPos?.y ?? 0) + 1,
      )
    : 4;
  const [code, setCode] = useState("");
  const [trail, setTrail] = useState<Step[]>([startStep]);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err" | "idle"; msg?: string }>({
    kind: "idle",
  });
  const [showHint, setShowHint] = useState(false);
  const [reward, setReward] = useState(false);
  const [rewardData, setRewardData] = useState<{ coins: number; xp: number; badge?: string }>({
    coins: 0,
    xp: 0,
  });
  const [animating, setAnimating] = useState(false);
  const [runStartedAt, setRunStartedAt] = useState<number | null>(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizStartedAt, setQuizStartedAt] = useState<number | null>(null);
  const navigate = useNavigate();

  const awardCoins = useProgressStore((s) => s.awardCoins);
  const addXp = useProgressStore((s) => s.addXp);
  const unlockBadge = useProgressStore((s) => s.unlockBadge);
  const completeChallenge = useProgressStore((s) => s.completeChallenge);
  const recordAttempt = useProgressStore((s) => s.recordAttempt);
  const attempts = useProgressStore((s) => s.attempts);
  const userId = useUserStore((s) => s.userId);

  const playClick = useCallback(() => {
    void unlockAudio();
    playSfx("click");
  }, []);

  const makeAttemptId = () =>
    globalThis.crypto?.randomUUID?.() ?? `att_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  // Published after the animation finishes — evaluate win/loss here so kids
  // see Bolt travel before they read the result.
  const onAnimationEnd = useCallback(() => {
    if (!isGrid) return;
    if (!challenge.goalPos) throw new Error("Invalid grid challenge: missing goalPos");
    setAnimating(false);
    const result = simulate(code, startStep);
    const win =
      result.finalPos.x === challenge.goalPos.x && result.finalPos.y === challenge.goalPos.y;

    if (runStartedAt) {
      const createdAt = Date.now();
      const timeTaken = Math.max(0, createdAt - runStartedAt);
      const movesUsed = Math.max(0, (result.trail?.length ?? 1) - 1);
      const attempt = {
        id: makeAttemptId(),
        challengeId: challenge.id,
        type: "grid" as const,
        success: win,
        timeTaken,
        movesUsed,
        createdAt,
      };
      recordAttempt(attempt);
      setRunStartedAt(null);

      if (win) {
        const r = computeReward([...attempts, attempt], challenge.id);
        completeChallenge(challenge.id);
        awardCoins(r.coins);
        addXp(r.xp);
        for (const b of r.badges) unlockBadge(b);
        setRewardData({ coins: r.coins, xp: r.xp, badge: r.badges[0] });
        if (userId) void syncAttempts(userId);
      }
    }

    if (win) {
      playSfx("success");
      const msg = "Eiii, you did it! I knew you could fly me to the Moon!";
      setFeedback({ kind: "ok", msg });
      void narrate(msg);
      setReward(true);
    } else {
      playSfx("error");
      const msg = directionalFeedback(result.finalPos, challenge.goalPos);
      setFeedback({
        kind: "err",
        msg,
      });
      void narrate(msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts, code, challenge, isGrid, recordAttempt, runStartedAt, startStep, userId]);

  const onRun = () => {
    if (!isGrid) return;
    if (!challenge.start) throw new Error("Invalid grid challenge: missing start");
    void unlockAudio();
    // Guard: empty code → no blocks connected under the hat
    if (!code.trim()) {
      playSfx("error");
      const msg =
        "Hei! Please drag some Move blocks and snap them under ✦ When Run is pressed first — then we can fly!";
      setFeedback({
        kind: "err",
        msg,
      });
      void narrate(msg);
      return;
    }

    const startedAt = Date.now();
    setRunStartedAt(startedAt);

    // Run simulator eagerly to get the trail; animate the trail in GridSim;
    // win/loss evaluation happens in onAnimationEnd after the animation.
    const result = simulate(code, startStep);

    if (result.error) {
      playSfx("error");
      setFeedback({ kind: "err", msg: result.error });
      void narrate(result.error);
      const createdAt = Date.now();
      recordAttempt({
        id: makeAttemptId(),
        challengeId: challenge.id,
        type: "grid" as const,
        success: false,
        timeTaken: Math.max(0, createdAt - startedAt),
        movesUsed: 0,
        createdAt,
      });
      setRunStartedAt(null);
      return;
    }

    setTrail(result.trail);
    setAnimating(true);
    setFeedback({ kind: "idle" }); // clear stale feedback while animating
  };

  const onReset = () => {
    playClick();
    setTrail([startStep]);
    setFeedback({ kind: "idle" });
    setAnimating(false);
  };

  const onSubmitQuiz = () => {
    if (!isQuiz) return;
    void unlockAudio();
    const createdAt = Date.now();
    const startedAt = quizStartedAt ?? createdAt;
    const timeTaken = Math.max(0, createdAt - startedAt);

    const kind = challenge.quiz?.kind ?? "text";
    let success = false;
    let normalizedAnswer: unknown = quizAnswer.trim();

    if (kind === "number") {
      const n = Number(quizAnswer);
      normalizedAnswer = n;
      success =
        Number.isFinite(n) &&
        typeof challenge.quiz?.answer === "number" &&
        n === challenge.quiz.answer;
    } else if (kind === "multipleChoice") {
      normalizedAnswer = quizAnswer;
      success =
        Boolean(challenge.quiz?.correctChoiceId) &&
        quizAnswer === (challenge.quiz?.correctChoiceId ?? "");
    } else {
      const acceptable = (challenge.quiz?.acceptableAnswers ?? []).map((s) =>
        s.trim().toLowerCase(),
      );
      success = acceptable.length
        ? acceptable.includes(quizAnswer.trim().toLowerCase())
        : quizAnswer.trim().length > 0;
    }

    const attempt = {
      id: makeAttemptId(),
      challengeId: challenge.id,
      type: "quiz" as const,
      success,
      timeTaken,
      movesUsed: 0,
      createdAt,
      answer: normalizedAnswer,
    };
    recordAttempt(attempt);

    if (success) {
      playSfx("success");
      const r = computeReward([...attempts, attempt], challenge.id);
      completeChallenge(challenge.id);
      awardCoins(r.coins);
      addXp(r.xp);
      for (const b of r.badges) unlockBadge(b);
      setRewardData({ coins: r.coins, xp: r.xp, badge: r.badges[0] });
      if (userId) void syncAttempts(userId);
      const msg = "Eiii! Correct! You are learning fast!";
      setFeedback({ kind: "ok", msg });
      void narrate(msg);
      setReward(true);
    } else {
      playSfx("error");
      const msg = "Not yet — try again, you can do it!";
      setFeedback({ kind: "err", msg });
      void narrate(msg);
    }
  };

  const codeReady = code.trim().length > 0;
  const feedbackText =
    feedback.kind === "idle"
      ? isGrid
        ? "Snap some blocks under 'When Run is pressed', then hit Run — let us fly!"
        : "Read the question and answer it — you can do it!"
      : feedback.kind === "ok"
        ? "🎉 " + feedback.msg
        : "🤔 " + feedback.msg;

  return (
    <PageShell>
      <header className="flex items-center justify-between gap-2 p-4 min-w-0">
        <Link
          to="/lesson/$id"
          params={{ id: lesson.id }}
          search={{ c: challenge.id }}
          className={cn(
            "inline-flex items-center gap-2 font-extrabold",
            "h-11 px-3 rounded-xl border-2 border-border bg-card shadow-[var(--shadow-soft)]",
            "hover:border-primary/60 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <Home className="w-5 h-5" /> Lesson
        </Link>
        <h1 className="font-extrabold text-lg truncate min-w-0 flex-1 text-center">
          {challenge.title}
        </h1>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              playClick();
              const next = !showHint;
              setShowHint(next);
              if (next) {
                const hint = challenge.hint ?? challenge.hints?.[0] ?? "Try again — you can do it!";
                void narrate(hint);
              }
            }}
            aria-controls="hint-panel"
            aria-expanded={showHint}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-extrabold",
              "h-11 px-3 rounded-xl border-2 border-border bg-card shadow-[var(--shadow-soft)]",
              "hover:border-primary/60 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            id="hint-toggle"
          >
            <Lightbulb className="w-5 h-5" /> Hint
          </button>
          <SoundToggle className="w-11 h-11" />
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-2 gap-4 px-4 pb-4 max-w-5xl w-full mx-auto min-w-0">
        <section className="flex flex-col gap-3 min-w-0">
          {isGrid && challenge.goalPos ? (
            <GridSim
              size={gridSize}
              trail={trail}
              goal={challenge.goalPos}
              animating={animating}
              onAnimationEnd={onAnimationEnd}
            />
          ) : (
            <div className="rounded-2xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]">
              <div className="text-xs text-muted-foreground font-semibold">QUESTION</div>
              <div className="mt-2 text-lg font-extrabold">
                {challenge.quiz?.question ?? challenge.prompt}
              </div>
              <div className="mt-2 text-sm text-muted-foreground font-semibold">
                {challenge.goal}
              </div>

              {challenge.quiz?.kind === "multipleChoice" ? (
                <div className="mt-4 grid gap-2">
                  {(challenge.quiz?.choices ?? []).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        playClick();
                        if (!quizStartedAt) setQuizStartedAt(Date.now());
                        setQuizAnswer(c.id);
                      }}
                      aria-pressed={quizAnswer === c.id}
                      className={[
                        "text-left rounded-2xl border-2 px-5 py-4 min-h-14 font-bold text-base sm:text-lg transition-colors flex items-center",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        quizAnswer === c.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card",
                      ].join(" ")}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <Input
                    value={quizAnswer}
                    onChange={(e) => {
                      if (!quizStartedAt) setQuizStartedAt(Date.now());
                      setQuizAnswer(e.target.value);
                    }}
                    placeholder={
                      challenge.quiz?.kind === "number" ? "Type a number…" : "Type your answer…"
                    }
                    className="h-12 font-extrabold text-lg"
                    inputMode={challenge.quiz?.kind === "number" ? "numeric" : undefined}
                    enterKeyHint="done"
                    onKeyDown={(e) => {
                      if (e.key !== "Enter") return;
                      if (!quizAnswer.trim()) return;
                      playClick();
                      onSubmitQuiz();
                    }}
                  />
                </div>
              )}
            </div>
          )}
          <SyncStatus />
          {showHint && (
            <SpeechBubble id="hint-panel" arrow="none" className="text-sm" aria-live="polite">
              <div>💡 {challenge.hint ?? challenge.hints?.[0] ?? "Try again — you can do it!"}</div>
              {/\bswap\b/i.test(challenge.title ?? "") ||
              /\bswap\b/i.test(challenge.prompt ?? "") ? (
                <SwapCupsExplainer />
              ) : null}
            </SpeechBubble>
          )}
          <div className="flex items-center gap-2">
            <Mascot size="sm" bob={animating} />
            <SpeechBubble className="flex-1 text-sm" arrow="left" aria-live="polite">
              {feedbackText}
            </SpeechBubble>
          </div>
        </section>

        <section className="flex flex-col gap-3 min-h-[420px] min-w-0">
          {isQuiz ? (
            <div className="flex gap-3">
              <BigButton
                variant="ghost"
                onClick={() => {
                  playClick();
                  setQuizAnswer("");
                  setFeedback({ kind: "idle" });
                }}
                className="flex-1"
              >
                Clear
              </BigButton>
              <BigButton
                variant="success"
                onClick={() => {
                  playClick();
                  onSubmitQuiz();
                }}
                className="flex-[2]"
                disabled={!quizAnswer.trim()}
              >
                Submit Answer
              </BigButton>
            </div>
          ) : null}
          <Suspense
            fallback={
              <div className="flex-1 grid place-items-center rounded-2xl border-2 border-dashed border-border bg-card/50">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                  <p className="mt-2 text-sm text-muted-foreground font-bold">
                    Loading code blocks…
                  </p>
                </div>
              </div>
            }
          >
            {isGrid ? (
              <div className="flex-1 min-h-[360px] min-w-0 overflow-hidden">
                <BlocklyWorkspace onCodeChange={setCode} />
              </div>
            ) : (
              <div className="flex-1 grid place-items-center rounded-2xl border-2 border-dashed border-border bg-card/50 p-6 text-center">
                <div>
                  <p className="font-extrabold text-lg">No blocks needed</p>
                  <p className="text-sm text-muted-foreground font-semibold mt-1">
                    This is a thinking challenge — answer the question on the left.
                  </p>
                </div>
              </div>
            )}
          </Suspense>
          {isGrid ? (
            <div className="flex gap-3">
              <BigButton
                variant="ghost"
                onClick={onReset}
                icon={<RotateCcw className="w-5 h-5" />}
                className="flex-1"
                disabled={animating}
              >
                Reset
              </BigButton>
              <BigButton
                variant="success"
                onClick={() => {
                  playClick();
                  onRun();
                }}
                icon={<Play className="w-5 h-5" />}
                className={cn(
                  "flex-[2] transition-all",
                  codeReady && !animating && "animate-[pulse-glow_2.2s_ease-in-out_infinite]",
                )}
                disabled={animating}
              >
                {animating ? "Flying…" : "Run Code"}
              </BigButton>
            </div>
          ) : null}
        </section>
      </main>

      <RewardModal
        open={reward}
        coins={rewardData.coins}
        xp={rewardData.xp}
        badge={rewardData.badge}
        onClose={async () => {
          setReward(false);
          try {
            const lessons = await fetchLessons();
            const next = getNextLevel(lessons, lesson.id, challenge.id);
            if (next) {
              queueNarration("Great job! Next mission loading now.");
              navigate({
                to: "/lesson/$id",
                params: { id: next.lessonId },
                search: { c: next.challengeId },
              });
              return;
            }
          } catch {
            // ignore and fall back
          }
          navigate({ to: "/journey" });
        }}
      />
    </PageShell>
  );
}
