import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { getLesson, type Lesson } from "@/features/lessons/lessonData";
import { BigButton } from "@/components/cq/BigButton";
import { Mascot } from "@/components/cq/Mascot";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { GridSim } from "@/features/blockly/GridSim";
import { simulate, type Step } from "@/features/blockly/simulator";
import { RewardModal } from "@/components/cq/RewardModal";
import { useGameStore } from "@/store/useGameStore";
import { Home, Lightbulb, Play, RotateCcw } from "lucide-react";
import { playSfx } from "@/services/audio";

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

function PlayPage() {
  const lesson = Route.useLoaderData() as Lesson;
  const challenge = lesson.challenge;
  const [code, setCode] = useState("");
  const [trail, setTrail] = useState<Step[]>([challenge.start]);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err" | "idle"; msg?: string }>({ kind: "idle" });
  const [showHint, setShowHint] = useState(false);
  const [reward, setReward] = useState(false);
  const navigate = useNavigate();

  const { awardCoins, addXp, unlockBadge, completeChallenge, recordAttempt } = useGameStore();

  const onRun = () => {
    recordAttempt(challenge.id);
    const result = simulate(code, challenge.start);
    setTrail(result.trail);
    if (result.error) {
      playSfx("error");
      setFeedback({ kind: "err", msg: result.error });
      return;
    }
    const win =
      result.finalPos.x === challenge.goalPos.x && result.finalPos.y === challenge.goalPos.y;
    if (win) {
      playSfx("success");
      completeChallenge(challenge.id);
      awardCoins(challenge.reward.coins);
      addXp(challenge.reward.xp);
      if (challenge.reward.badge) unlockBadge(challenge.reward.badge);
      setFeedback({ kind: "ok", msg: "You did it!" });
      setReward(true);
    } else {
      playSfx("error");
      setFeedback({
        kind: "err",
        msg: `Almost! Bolt landed at (${result.finalPos.x}, ${result.finalPos.y}).`,
      });
    }
  };

  const onReset = () => {
    setTrail([challenge.start]);
    setFeedback({ kind: "idle" });
  };

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] flex flex-col">
      <header className="flex items-center justify-between p-4">
        <Link to="/lesson/$id" params={{ id: lesson.id }} className="inline-flex items-center gap-1 font-bold">
          <Home className="w-5 h-5" /> Lesson
        </Link>
        <h1 className="font-extrabold text-lg truncate">{challenge.title}</h1>
        <button
          onClick={() => setShowHint((s) => !s)}
          className="inline-flex items-center gap-1 text-sm font-bold text-primary"
        >
          <Lightbulb className="w-4 h-4" /> Hint
        </button>
      </header>

      <main className="flex-1 grid lg:grid-cols-2 gap-4 px-4 pb-4 max-w-5xl w-full mx-auto">
        <section className="flex flex-col gap-3">
          <GridSim trail={trail} goal={challenge.goalPos} />
          {showHint && (
            <SpeechBubble arrow="none" className="text-sm">
              💡 {challenge.hint}
            </SpeechBubble>
          )}
          <div className="flex items-center gap-2">
            <Mascot size="sm" bob={false} />
            <SpeechBubble className="flex-1 text-sm" arrow="left">
              {feedback.kind === "idle" && "Drag blocks then press Run to fly me to the moon!"}
              {feedback.kind === "ok" && "🎉 " + feedback.msg}
              {feedback.kind === "err" && "🤔 " + feedback.msg}
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
            <BigButton variant="ghost" onClick={onReset} icon={<RotateCcw className="w-5 h-5" />} className="flex-1">
              Reset
            </BigButton>
            <BigButton
              variant="success"
              onClick={onRun}
              icon={<Play className="w-5 h-5" />}
              className="flex-[2]"
            >
              Run Code
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
