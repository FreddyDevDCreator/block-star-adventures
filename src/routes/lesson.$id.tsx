import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getLesson, type Lesson } from "@/features/lessons/lessonData";
import { Mascot } from "@/components/cq/Mascot";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { BigButton } from "@/components/cq/BigButton";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { useGameStore } from "@/store/useGameStore";
import { ChevronLeft, ChevronRight, Code2, Home } from "lucide-react";

export const Route = createFileRoute("/lesson/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Lesson — CodeQuest` },
      { name: "description", content: `Read the ${params.id} comic.` },
    ],
  }),
  loader: ({ params }) => {
    const lesson = getLesson(params.id);
    if (!lesson) throw notFound();
    return lesson;
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
  const completeScene = useGameStore((s) => s.completeScene);
  const addXp = useGameStore((s) => s.addXp);
  const navigate = useNavigate();
  const scene = lesson.scenes[i];
  const isLast = i === lesson.scenes.length - 1;

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
          {lesson.scenes.map((_s, idx) => (
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
            {i + 1}/{lesson.scenes.length}
          </span>
          <SoundToggle />
        </div>
      </header>

      <main className="flex-1 px-4 pb-4 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div
          key={i}
          className={`w-full aspect-[4/3] rounded-3xl border-4 border-card shadow-[var(--shadow-pop)] grid place-items-center text-[120px] bg-gradient-to-br ${scene.bg} animate-fade-in`}
        >
          <span className="drop-shadow-lg">{scene.panelEmoji}</span>
        </div>
        <p key={`t-${i}`} className="mt-4 text-center text-lg font-bold animate-fade-in">
          {scene.text}
        </p>

        <div className="mt-4 flex items-end gap-3 w-full animate-fade-in" key={`b-${i}`}>
          <Mascot size="sm" bob={false} />
          {/* speak=true auto-narrates the bubble text whenever the scene changes */}
          <SpeechBubble className="flex-1" speak>{scene.bubble}</SpeechBubble>
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
