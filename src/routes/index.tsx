import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { Mascot } from "@/components/cq/Mascot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeQuest — Learn to Code with Bolt" },
      {
        name: "description",
        content: "A fun, gamified coding adventure for kids 10–14. Snap blocks, solve puzzles, and earn badges.",
      },
      { property: "og:title", content: "CodeQuest — Learn to Code with Bolt" },
      { property: "og:description", content: "Snap blocks, solve puzzles, and earn badges." },
    ],
  }),
  component: Index,
});

function Index() {
  const hydrated = useGameStore((s) => s.hydrated);
  const onboarded = useGameStore((s) => s.onboarded);
  const hydrate = useGameStore((s) => s.hydrate);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    hydrate().finally(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, [hydrate]);

  if (!ready || !hydrated) {
    return (
      <div className="min-h-dvh bg-[image:var(--gradient-sky)] grid place-items-center">
        <div className="text-center">
          <Mascot size="xl" />
          <p className="mt-4 font-extrabold text-xl">CodeQuest</p>
          <p className="text-muted-foreground text-sm">Booting up Bolt…</p>
        </div>
      </div>
    );
  }

  return <Navigate to={onboarded ? "/dashboard" : "/onboarding"} />;
}
