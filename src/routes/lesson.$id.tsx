import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchLesson, fetchLessons, getPrimaryChallenge, type Lesson } from "@/services/lessons";
import { Mascot } from "@/components/cq/Mascot";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { BigButton } from "@/components/cq/BigButton";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { PageShell } from "@/components/cq/PageShell";
import { useProgressStore } from "@/store/useProgressStore";
import { ChevronLeft, ChevronRight, Code2, Home } from "lucide-react";
import { narrate } from "@/services/audio";
import { queueNarration } from "@/services/narrationQueue";
import { useSettingsStore } from "@/store/useSettingsStore";

export const Route = createFileRoute("/lesson/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Lesson — Block Star Adventures` },
      { name: "description", content: `Read the ${params.id} comic.` },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => {
    return {
      c: typeof search.c === "string" ? search.c : undefined,
    };
  },
  loader: async ({ params }) => {
    try {
      const [lesson, lessons] = await Promise.all([fetchLesson(params.id), fetchLessons()]);
      return { lesson, lessons };
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
  const { lesson, lessons } = Route.useLoaderData() as { lesson: Lesson; lessons: Lesson[] };
  const [i, setI] = useState(0);
  const completeScene = useProgressStore((s) => s.completeScene);
  const addXp = useProgressStore((s) => s.addXp);
  const navigate = useNavigate();
  const { c } = Route.useSearch();
  const soundOn = useSettingsStore((s) => s.soundOn);
  const primary = getPrimaryChallenge(lesson);
  const selected = c ? (lesson.challenges.find((ch) => ch.id === c) ?? null) : primary;
  const selectedChallengeId = selected?.id ?? primary?.id ?? "";
  const scenes = selected?.scenes ?? [];
  const scene = scenes[i];
  const totalScenes = scenes.length;
  const isLast = i === scenes.length - 1;

  const worldIndex = lessons.findIndex((l) => l.id === lesson.id);
  const worldNumber = worldIndex >= 0 ? worldIndex + 1 : 1;
  const levelIndex = lesson.challenges.findIndex((ch) => ch.id === selectedChallengeId);
  const levelNumber = levelIndex >= 0 ? levelIndex + 1 : 1;

  useEffect(() => {
    setI(0);
  }, [selectedChallengeId]);

  const goNext = () => {
    if (!scene) return;
    completeScene(`${lesson.id}:${selectedChallengeId}:${i}`);
    addXp(5);
    if (isLast) {
      if (soundOn) queueNarration("Nice! Now it’s your turn. Let’s code!");
      navigate({
        to: "/play/$id",
        params: { id: lesson.id },
        search: { c: selectedChallengeId || undefined },
      });
    } else {
      const nextIdx = i + 1;
      setI(nextIdx);
      const nextText = scenes[nextIdx]?.text;
      if (nextText) void narrate(nextText);
    }
  };

  return (
    <PageShell>
      <header className="flex items-center justify-between gap-2 p-4 min-w-0">
        <Link
          to="/dashboard"
          className={
            "inline-flex items-center gap-2 font-extrabold " +
            "h-11 px-3 rounded-xl border-2 border-border bg-card shadow-[var(--shadow-soft)] " +
            "hover:border-primary/60 transition-colors " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          }
        >
          <Home className="w-5 h-5" /> Dashboard
        </Link>

        <div className="min-w-0 flex-1 text-center">
          <h1 className="font-extrabold text-lg truncate">{lesson.title}</h1>
          <div className="mt-0.5 text-xs text-muted-foreground font-semibold">
            World {worldNumber} • Level {levelNumber} • Scene{" "}
            {Math.min(i + 1, Math.max(1, totalScenes))}/{Math.max(1, totalScenes)}
          </div>
          <div className="mt-2 flex justify-center gap-1" aria-hidden="true">
            {scenes.map((_s, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <SoundToggle className="w-11 h-11" />
      </header>

      <main className="flex-1 px-4 pb-4 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div
          className="w-full flex items-end gap-3 animate-fade-in"
          key={`scene-${selectedChallengeId}-${i}`}
        >
          <Mascot size="sm" bob={false} />
          <SpeechBubble className="flex-1" arrow="left" aria-live="polite">
            <div className="text-xs text-muted-foreground font-semibold">SCENE</div>
            <div className="mt-1 text-xl font-extrabold">{scene?.speaker ?? "Coach"}</div>
            <p className="mt-2 text-base font-bold text-foreground">
              {scene?.text ?? (totalScenes ? "Loading…" : "No scenes in this lesson yet.")}
            </p>
          </SpeechBubble>
        </div>
      </main>

      <footer className="p-4 flex gap-3 max-w-md mx-auto w-full">
        <BigButton
          variant="ghost"
          onClick={() => {
            const prev = Math.max(0, i - 1);
            setI(prev);
            const prevText = scenes[prev]?.text;
            if (prevText) void narrate(prevText);
          }}
          disabled={i === 0}
          icon={<ChevronLeft className="w-5 h-5" />}
          className="flex-1"
        >
          Back
        </BigButton>
        <BigButton
          onClick={goNext}
          disabled={!scene}
          icon={isLast ? <Code2 className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          className="flex-[2]"
        >
          {isLast ? "Start coding!" : "Next"}
        </BigButton>
      </footer>
    </PageShell>
  );
}
