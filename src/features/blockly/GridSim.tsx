// Tiny 4x4 grid that renders the rocket trail.
import type { Step } from "./simulator";

interface GridSimProps {
  size?: number;
  trail: Step[];
  goal: Step;
}

export function GridSim({ size = 4, trail, goal }: GridSimProps) {
  const cells = Array.from({ length: size * size }, (_, i) => {
    const x = i % size;
    const y = size - 1 - Math.floor(i / size);
    const isGoal = x === goal.x && y === goal.y;
    const inTrail = trail.some((s) => s.x === x && s.y === y);
    const last = trail[trail.length - 1];
    const isRocket = last && last.x === x && last.y === y;
    return (
      <div
        key={i}
        className={`aspect-square rounded-lg border-2 border-border flex items-center justify-center text-2xl transition-all
          ${inTrail ? "bg-primary/15" : "bg-card"}
          ${isGoal ? "bg-accent/30 border-accent" : ""}`}
      >
        {isRocket ? "🚀" : isGoal ? "🌙" : ""}
      </div>
    );
  });

  return (
    <div
      className="grid gap-2 p-3 rounded-2xl bg-[image:var(--gradient-sky)] border-2 border-border"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {cells}
    </div>
  );
}
