import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchLessons, type Lesson } from "@/services/lessons";
import { useProgressStore } from "@/store/useProgressStore";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { ChevronRight, Home, Lock, Play, Trophy } from "lucide-react";
import { PageShell } from "@/components/cq/PageShell";
import { UserAvatar } from "@/components/cq/UserAvatar";
import { useUserStore } from "@/store/useUserStore";
import { BigButton } from "@/components/cq/BigButton";

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
  const avatar = useUserStore((s) => s.avatar);

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

  const nextIdx = Math.max(0, levels.findIndex((l) => !l.completed));
  const next = levels[nextIdx] ?? null;

  return (
    <PageShell>
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <Link to="/dashboard" className="inline-flex items-center gap-1 font-bold">
            <Home className="w-5 h-5" /> Home
          </Link>
          <div className="flex items-center gap-2">
            <SoundToggle />
            <UserAvatar avatarId={avatar} />
          </div>
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]">
          <h1 className="text-2xl font-extrabold">Your Journey</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            Follow the path. Each dot is a mission.
          </p>
          {next && (
            <div className="mt-4">
              <Link
                to="/lesson/$id"
                params={{ id: next.lessonId }}
                search={{ c: next.challengeId }}
                className="block"
              >
                <BigButton className="w-full" icon={<ChevronRight className="w-5 h-5" />}>
                  Start next mission
                </BigButton>
              </Link>
            </div>
          )}
        </section>

        <ol className="relative pl-16 py-2">
          <div
            aria-hidden="true"
            className="absolute left-[32px] top-0 bottom-0 w-[6px] rounded-full bg-[repeating-linear-gradient(180deg,oklch(0.67_0.17_240/0.45)_0px,oklch(0.67_0.17_240/0.45)_20px,transparent_20px,transparent_34px)]"
          />

          {levels.map((lvl, idx) => {
            const locked = idx > nextIdx; // only next mission is playable
            const side = idx % 2 === 0 ? "pr-10" : "pl-10";
            const align = idx % 2 === 0 ? "items-start" : "items-end";

            return (
              <li key={`${lvl.lessonId}:${lvl.challengeId}`} className={["relative mb-4 flex", side].join(" ")}>
                <div className="absolute -left-2 top-1.5 w-12 grid place-items-center">
                  <div
                    className={[
                      "w-10 h-10 rounded-2xl border-2 grid place-items-center",
                      lvl.completed ? "bg-success/10 border-success" : locked ? "bg-muted/30 border-border" : "bg-primary/10 border-primary",
                    ].join(" ")}
                  >
                    {lvl.completed ? (
                      <Trophy className="w-5 h-5 text-success" />
                    ) : locked ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Play className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>

                <div className={["w-full flex", align].join(" ")}>
                  {locked ? (
                    <div className="w-full rounded-3xl bg-card/80 border-2 border-border p-4 opacity-80">
                      <div className="text-xs text-muted-foreground font-semibold">
                        Level {idx + 1} • {lvl.type.toUpperCase()}
                      </div>
                      <div className="font-extrabold">{lvl.title}</div>
                      <div className="text-xs text-muted-foreground">{lvl.lessonTitle}</div>
                    </div>
                  ) : (
                    <Link
                      to="/lesson/$id"
                      params={{ id: lvl.lessonId }}
                      search={{ c: lvl.challengeId }}
                      className="block w-full"
                    >
                      <div className="w-full rounded-3xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)] hover:border-primary transition-colors">
                        <div className="text-xs text-muted-foreground font-semibold">
                          Level {idx + 1} • {lvl.type.toUpperCase()}
                        </div>
                        <div className="font-extrabold">{lvl.title}</div>
                        <div className="text-xs text-muted-foreground">{lvl.lessonTitle}</div>
                        <div className="mt-2 text-xs font-extrabold text-primary">
                          {lvl.completed ? "Replay" : "Play"}
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </PageShell>
  );
}

