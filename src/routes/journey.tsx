import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchLessons, type Lesson } from "@/services/lessons";
import { useProgressStore } from "@/store/useProgressStore";
import { Mascot } from "@/components/cq/Mascot";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { Play, Trophy, Home } from "lucide-react";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Journey — Block Star Adventures" },
      { name: "description", content: "Choose your next coding mission." },
    ],
  }),
  loader: async () => {
    return await fetchLessons();
  },
  component: JourneyPage,
});

function JourneyPage() {
  const lessons = Route.useLoaderData() as Lesson[];
  const completedChallenges = useProgressStore((s) => s.completedChallenges);

  const levels = lessons.flatMap((lesson) =>
    (lesson.challenges ?? []).map((c) => ({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      challengeId: c.id,
      title: c.title,
      type: c.type ?? "grid",
      completed: completedChallenges.includes(c.id),
    })),
  );

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] p-4 sm:p-6">
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <Link to="/dashboard" className="inline-flex items-center gap-1 font-bold">
            <Home className="w-5 h-5" /> Home
          </Link>
          <div className="flex items-center gap-2">
            <SoundToggle />
            <Mascot size="md" />
          </div>
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]">
          <h1 className="text-2xl font-extrabold">Your Journey</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            Pick a mission and level up your coding skills.
          </p>
        </section>

        <ul className="flex flex-col gap-2">
          {levels.map((lvl, idx) => (
            <li key={`${lvl.lessonId}:${lvl.challengeId}`}>
              <Link
                to="/play/$id"
                params={{ id: lvl.lessonId }}
                search={{ c: lvl.challengeId }}
                className={[
                  "flex items-center gap-3 rounded-2xl bg-card border-2 border-border p-3 transition-colors",
                  "hover:border-primary",
                ].join(" ")}
              >
                <div className="w-12 h-12 rounded-xl bg-[image:var(--gradient-primary)] grid place-items-center text-xl">
                  {lvl.completed ? <Trophy className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground font-semibold">
                    Level {idx + 1} • {lvl.type.toUpperCase()}
                  </div>
                  <div className="font-extrabold">{lvl.title}</div>
                  <div className="text-xs text-muted-foreground">{lvl.lessonTitle}</div>
                </div>
                {lvl.completed ? (
                  <span className="text-xs font-extrabold text-success">DONE</span>
                ) : (
                  <span className="text-xs font-extrabold text-primary">PLAY</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

