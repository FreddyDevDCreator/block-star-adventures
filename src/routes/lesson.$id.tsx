import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { fetchLesson, getPrimaryChallenge, type Lesson } from "@/services/lessons";
import { Mascot } from "@/components/cq/Mascot";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { BigButton } from "@/components/cq/BigButton";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { useProgressStore } from "@/store/useProgressStore";
import { ChevronLeft, ChevronRight, Code2, Home } from "lucide-react";

export const Route = createFileRoute("/lesson/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Lesson — CodeQuest` },
      { name: "description", content: `Read the ${params.id} comic.` },
    ],
  }),
  loader: async ({ params }) => {
    try {
      return await fetchLesson(params.id);
    } catch {
      throw notFound();
    }
  },
  component: LessonPage,
  notFoundComponent: () => (
    <div className="min-h-dvh grid place-items-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-extrabold">Lesson not found</h1>
        <Link to="/dashboard" className="text-primary font-bold mt-3 inline-block">
          Back to dashboard
        </Link>
      </div>
    </div>
  ),
});

function LessonPage() {
  const lesson = Route.useLoaderData() as Lesson;
  const [i, setI] = useState(0);
  const completeScene = useProgressStore((s) => s.completeScene);
  const addXp = useProgressStore((s) => s.addXp);
  const navigate = useNavigate();
  const primary = getPrimaryChallenge(lesson);
  const scenes = primary?.scenes ?? [];
  const scene = scenes[i];
  const isLast = i === scenes.length - 1;

  const goNext = () => {
    completeScene(`${lesson.id}:${i}`);
    addXp(5);
    if (isLast) {
      navigate({ to: "/play/$id", params: { id: lesson.id } });
    } else {
      setI(i + 1);
    }
  };

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] flex flex-col">
      <header className="flex items-center justify-between p-4">
        <Link to="/dashboard" className="inline-flex items-center gap-1 font-bold text-foreground/80 hover:text-foreground">
          <Home className="w-5 h-5" /> Home
        </Link>
        <div className="flex gap-1">
          {scenes.map((_s, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted-foreground">
            {Math.min(i + 1, Math.max(1, scenes.length))}/{Math.max(1, scenes.length)}
          </span>
          <SoundToggle />
        </div>
      </header>

      <main className="flex-1 px-4 pb-4 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="w-full rounded-3xl border-4 border-card shadow-[var(--shadow-pop)] bg-card p-6 animate-fade-in">
          <div className="text-xs text-muted-foreground font-semibold">SCENE</div>
          <div className="mt-2 text-xl font-extrabold">{scene?.speaker ?? "Coach"}</div>
          <p className="mt-3 text-base font-bold text-foreground">
            {scene?.text ?? "Loading…"}
          </p>
        </div>

        <div className="mt-4 flex items-end gap-3 w-full animate-fade-in" key={`b-${i}`}>
          <Mascot size="sm" bob={false} />
          {/* speak=true auto-narrates the bubble text whenever the scene changes */}
          <SpeechBubble className="flex-1" speak>{scene?.text ?? ""}</SpeechBubble>
        </div>
      </main>

      <footer className="p-4 flex gap-3 max-w-md mx-auto w-full">
        <BigButton
          variant="ghost"
          onClick={() => setI(Math.max(0, i - 1))}
          disabled={i === 0}
          icon={<ChevronLeft className="w-5 h-5" />}
          className="flex-1"
        >
          Back
        </BigButton>
        <BigButton
          onClick={goNext}
          icon={isLast ? <Code2 className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          className="flex-[2]"
        >
          {isLast ? "Start coding!" : "Next"}
        </BigButton>
      </footer>
    </div>
  );
}
