import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { fetchLessons, type Lesson } from "@/services/lessons";
import { useProgressStore } from "@/store/useProgressStore";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { ChevronRight, Home, Lock, Play, Trophy } from "lucide-react";
import { PageShell } from "@/components/cq/PageShell";
import { UserAvatar } from "@/components/cq/UserAvatar";
import { useUserStore } from "@/store/useUserStore";
import { BigButton } from "@/components/cq/BigButton";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";

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
  const navigate = useNavigate();
  const lessons = Route.useLoaderData() as Lesson[];
  const completedChallenges = useProgressStore((s) => s.completedChallenges);
  const avatar = useUserStore((s) => s.avatar);

  const completedSet = useMemo(() => new Set(completedChallenges), [completedChallenges]);
  const levels = useMemo(
    () =>
      lessons.flatMap((lesson) =>
        (lesson.challenges ?? []).map((c) => ({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          challengeId: c.id,
          title: c.title,
          type: c.type ?? "grid",
          completed: completedSet.has(c.id),
        })),
      ),
    [completedSet, lessons],
  );

  const nextIdxRaw = useMemo(() => levels.findIndex((l) => !l.completed), [levels]);
  const allDone = nextIdxRaw === -1 && levels.length > 0;
  const nextIdx = nextIdxRaw === -1 ? Math.max(0, levels.length - 1) : Math.max(0, nextIdxRaw);
  const next = nextIdxRaw === -1 ? null : (levels[nextIdx] ?? null);

  const handleStartNext = useCallback(() => {
    if (!next) return;
    navigate({
      to: "/lesson/$id",
      params: { id: next.lessonId },
      search: { c: next.challengeId },
    });
  }, [navigate, next]);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-xl flex flex-col gap-5 sm:gap-6 overflow-x-hidden">
        <header className="flex items-center justify-between gap-2 min-w-0">
          <Link
            to="/dashboard"
            aria-label="Back to dashboard"
            className={
              "inline-flex items-center gap-2 font-extrabold " +
              "h-11 px-3 rounded-xl border-2 border-border bg-card shadow-[var(--shadow-soft)] " +
              "hover:border-primary/60 transition-colors " +
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            }
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Dashboard
          </Link>

          <h1 className="font-extrabold text-lg sm:text-xl truncate">Journey</h1>

          <div className="flex items-center gap-2">
            <SoundToggle className="w-11 h-11" />
            <UserAvatar avatarId={avatar} />
          </div>
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]">
          <h1 className="text-2xl font-extrabold">Your Journey</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            Follow the path. Each dot is a mission.
          </p>
          {levels.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground font-semibold">No missions yet.</p>
          ) : allDone ? (
            <p className="mt-4 text-sm text-muted-foreground font-semibold">
              You finished all missions — pick any to replay.
            </p>
          ) : next ? (
            <div className="mt-4">
              <BigButton
                className="w-full animate-[pulse-glow_2.2s_ease-in-out_infinite]"
                icon={<ChevronRight className="w-5 h-5" />}
                onClick={handleStartNext}
              >
                Start next mission
              </BigButton>
            </div>
          ) : null}
        </section>

        <section className="relative" aria-label="Mission path">
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-5 top-0 bottom-0",
              "border-l-[6px] border-dashed rounded-full",
              "border-primary/35",
            )}
          />

          <ol className="pl-14 py-2 space-y-4">
            {levels.map((lvl, idx) => {
              const locked = !allDone && idx > nextIdx; // only next mission is playable
              const iconWrapClass = lvl.completed
                ? "bg-success/10 border-success"
                : locked
                  ? "bg-muted/30 border-border"
                  : "bg-primary/10 border-primary";

              return (
                <li key={`${lvl.lessonId}:${lvl.challengeId}`} className="relative">
                  <div className="absolute left-5 top-4 w-11 h-11 grid place-items-center">
                    <div
                      className={[
                        "w-11 h-11 rounded-2xl border-2 grid place-items-center",
                        iconWrapClass,
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {lvl.completed ? (
                        <Trophy className="w-5 h-5 text-success" aria-hidden="true" />
                      ) : locked ? (
                        <Lock className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      ) : (
                        <Play className="w-5 h-5 text-primary" aria-hidden="true" />
                      )}
                    </div>
                  </div>

                  {locked ? (
                    <div
                      className="w-full rounded-3xl bg-card/80 border-2 border-border p-4 opacity-80"
                      aria-label={`${lvl.title} is locked`}
                    >
                      <div className="text-xs text-muted-foreground font-semibold">
                        Level {idx + 1} • {lvl.type.toUpperCase()}
                      </div>
                      <div className="font-extrabold">{lvl.title}</div>
                      <div className="text-xs text-muted-foreground">{lvl.lessonTitle}</div>
                      <div className="mt-2 text-xs font-extrabold text-muted-foreground">
                        Locked
                      </div>
                    </div>
                  ) : (
                    <Link
                      to="/lesson/$id"
                      params={{ id: lvl.lessonId }}
                      search={{ c: lvl.challengeId }}
                      aria-label={`${lvl.completed ? "Replay" : "Play"} ${lvl.title}`}
                      className={
                        "block w-full rounded-3xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)] " +
                        "transition-colors hover:border-primary active:scale-[0.99] " +
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      }
                    >
                      <div className="text-xs text-muted-foreground font-semibold">
                        Level {idx + 1} • {lvl.type.toUpperCase()}
                      </div>
                      <div className="font-extrabold">{lvl.title}</div>
                      <div className="text-xs text-muted-foreground">{lvl.lessonTitle}</div>
                      <div className="mt-2 text-xs font-extrabold text-primary">
                        {lvl.completed ? "Replay" : "Play"}
                      </div>
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </PageShell>
  );
}
