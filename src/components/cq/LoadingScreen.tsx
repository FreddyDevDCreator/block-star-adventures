import { Mascot } from "@/components/cq/Mascot";

export function LoadingScreen() {
  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] grid place-items-center">
      <div className="text-center">
        <Mascot size="xl" />
        <p className="mt-4 font-extrabold text-xl">CodeQuest</p>
        <p className="text-muted-foreground text-sm">Loading your adventure…</p>
      </div>
    </div>
  );
}

