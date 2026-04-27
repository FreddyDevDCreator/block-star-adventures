import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useState } from "react";
import { getLesson, type Lesson } from "@/features/lessons/lessonData";
import { BigButton } from "@/components/cq/BigButton";
import { Mascot } from "@/components/cq/Mascot";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { GridSim } from "@/features/blockly/GridSim";
import { simulate, type Step } from "@/features/blockly/simulator";
import { RewardModal } from "@/components/cq/RewardModal";
import { useGameStore } from "@/store/useGameStore";
import { Home, Lightbulb, Play, RotateCcw } from "lucide-react";
import { playSfx } from "@/services/audio";
import { cn } from "@/lib/utils";

// Blockly is heavy — lazy load so it stays out of the main bundle.
const BlocklyWorkspace = lazy(() => import("@/features/blockly/BlocklyWorkspace"));

export const Route = createFileRoute("/play/$id")({
  head: () => ({
    meta: [
      { title: "Coding Challenge — CodeQuest" },
      { name: "description", content: "Drag blocks to solve the challenge." },
    ],
  }),
  loader: ({ params }) => {
    const lesson = getLesson(params.id);
    if (!lesson) throw notFound();
    return lesson;
  },
  component: PlayPage,
});

// ── Directional feedback helper ─────────────────────────────────────────────
// Uses warm African English expressions so the voice feels familiar to kids.
function directionalFeedback(finalPos: Step, goalPos: Step): string {
  const dx = finalPos.x - goalPos.x;
  const dy = finalPos.y - goalPos.y;
  const lines: string[] = [];

  if (dx > 0) lines.push(`Chai! You went ${dx} step${dx > 1 ? "s" : ""} too far to the right. Remove ${dx} Move Right block${dx > 1 ? "s" : ""} and try again!`);
  else if (dx < 0) lines.push(`Eii! You need ${-dx} more step${-dx > 1 ? "s" : ""} to the right. Add ${-dx} Move Right block${-dx > 1 ? "s" : ""} and run again!`);

  if (dy > 0) lines.push(`You went ${dy} step${dy > 1 ? "s" : ""} too high. Remove ${dy} Move Up block${dy > 1 ? "s" : ""}, my friend!`);
  else if (dy < 0) lines.push(`You need ${-dy} more step${-dy > 1 ? "s" : ""} going up. Add ${-dy} Move Up block${-dy > 1 ? "s" : ""} — you are almost there!`);

  return lines.length
    ? lines.join(" ")
    : "Hmm! Keep changing the blocks — you will find the right answer, I know it!";
}

function PlayPage() {
  const lesson = Route.useLoaderData() as Lesson;
  const challenge = lesson.challenge;
  const [code, setCode] = useState("");
  const [trail, setTrail] = useState<Step[]>([challenge.start]);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err" | "idle"; msg?: string }>({ kind: "idle" });
  const [showHint, setShowHint] = useState(false);
  const [reward, setReward] = useState(false);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const { awardCoins, addXp, unlockBadge, completeChallenge, recordAttempt } = useGameStore();

  // Published after the animation finishes — evaluate win/loss here so kids
  // see Bolt travel before they read the result.
  const onAnimationEnd = useCallback(() => {
    setAnimating(false);
    const result = simulate(code, challenge.start);
    const win =
      result.finalPos.x === challenge.goalPos.x &&
      result.finalPos.y === challenge.goalPos.y;
    if (win) {
      playSfx("success");
      completeChallenge(challenge.id);
      awardCoins(challenge.reward.coins);
      addXp(challenge.reward.xp);
      if (challenge.reward.badge) unlockBadge(challenge.reward.badge);
      setFeedback({ kind: "ok", msg: "Eiii, you did it! I knew you could fly me to the Moon!" });
      setReward(true);
    } else {
      playSfx("error");
      setFeedback({
        kind: "err",
        msg: directionalFeedback(result.finalPos, challenge.goalPos),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, challenge]);

  const onRun = () => {
    // Guard: empty code → no blocks connected under the hat
    if (!code.trim()) {
      playSfx("error");
      setFeedback({
        kind: "err",
        msg: "Hei! Please drag some Move blocks and snap them under ✦ When Run is pressed first — then we can fly! 🧩",
      });
      return;
    }

    recordAttempt(challenge.id);

    // Run simulator eagerly to get the trail; animate the trail in GridSim;
    // win/loss evaluation happens in onAnimationEnd after the animation.
    const result = simulate(code, challenge.start);

    if (result.error) {
      playSfx("error");
      setFeedback({ kind: "err", msg: result.error });
      return;
    }

    setTrail(result.trail);
    setAnimating(true);
    setFeedback({ kind: "idle" }); // clear stale feedback while animating
  };

  const onReset = () => {
    setTrail([challenge.start]);
    setFeedback({ kind: "idle" });
    setAnimating(false);
  };

  const codeReady = code.trim().length > 0;
  const feedbackText =
    feedback.kind === "idle"
      ? "Snap some blocks under 'When Run is pressed', then hit Run — let us fly!"
      : feedback.kind === "ok"
      ? "🎉 " + feedback.msg
      : "🤔 " + feedback.msg;

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] flex flex-col">
      <header className="flex items-center justify-between p-4">
        <Link to="/lesson/$id" params={{ id: lesson.id }} className="inline-flex items-center gap-1 font-bold">
          <Home className="w-5 h-5" /> Lesson
        </Link>
        <h1 className="font-extrabold text-lg truncate">{challenge.title}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint((s) => !s)}
            className="inline-flex items-center gap-1 text-sm font-bold text-primary"
            id="hint-toggle"
          >
            <Lightbulb className="w-4 h-4" /> Hint
          </button>
          <SoundToggle />
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-2 gap-4 px-4 pb-4 max-w-5xl w-full mx-auto">
        <section className="flex flex-col gap-3">
          <GridSim
            trail={trail}
            goal={challenge.goalPos}
            animating={animating}
            onAnimationEnd={onAnimationEnd}
          />
          {showHint && (
            <SpeechBubble arrow="none" className="text-sm">
              💡 {challenge.hint}
            </SpeechBubble>
          )}
          <div className="flex items-center gap-2">
            <Mascot size="sm" bob={animating} />
            <SpeechBubble className="flex-1 text-sm" arrow="left" speak={!animating}>
              {feedbackText}
            </SpeechBubble>
          </div>
        </section>

        <section className="flex flex-col gap-3 min-h-[420px]">
          <Suspense
            fallback={
              <div className="flex-1 grid place-items-center rounded-2xl border-2 border-dashed border-border bg-card/50">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                  <p className="mt-2 text-sm text-muted-foreground font-bold">Loading code blocks…</p>
                </div>
              </div>
            }
          >
            <div className="flex-1 min-h-[360px]">
              <BlocklyWorkspace onCodeChange={setCode} />
            </div>
          </Suspense>
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
              onClick={onRun}
              icon={<Play className="w-5 h-5" />}
              className={cn(
                "flex-[2] transition-all",
                codeReady && !animating && "animate-pulse shadow-[0_0_16px_oklch(0.75_0.16_155/0.5)]",
              )}
              disabled={animating}
            >
              {animating ? "Flying…" : "Run Code"}
            </BigButton>
          </div>
        </section>
      </main>

      <RewardModal
        open={reward}
        coins={challenge.reward.coins}
        xp={challenge.reward.xp}
        badge={challenge.reward.badge}
        onClose={() => {
          setReward(false);
          navigate({ to: "/dashboard" });
        }}
      />
    </div>
  );
}
