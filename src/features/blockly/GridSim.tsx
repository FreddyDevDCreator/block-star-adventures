// Grid simulator — renders the rocket trail and optionally animates it
// step-by-step so kids see Bolt travelling rather than teleporting.
import { useEffect, useRef, useState } from "react";
import type { Step } from "./simulator";

interface GridSimProps {
  size?: number;
  trail: Step[];
  goal: Step;
  /** When true, animate Bolt through the trail 250ms per tile. */
  animating?: boolean;
  /** Called once after the last animation frame completes. */
  onAnimationEnd?: () => void;
}

const STEP_MS = 250;

export function GridSim({ size = 4, trail, goal, animating = false, onAnimationEnd }: GridSimProps) {
  // visibleUpTo tracks how many trail positions have been revealed.
  // Start at 1 (the starting position) when not animating; starts at 1 and
  // counts up when animating.
  const [visibleUpTo, setVisibleUpTo] = useState(trail.length);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onAnimationEndRef = useRef(onAnimationEnd);
  onAnimationEndRef.current = onAnimationEnd;

  useEffect(() => {
    // Clear any existing timer
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (animating && trail.length > 1) {
      // Start from position 0 (the start cell only visible)
      setVisibleUpTo(1);
      let current = 1;
      intervalRef.current = setInterval(() => {
        current += 1;
        setVisibleUpTo(current);
        if (current >= trail.length) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          onAnimationEndRef.current?.();
        }
      }, STEP_MS);
    } else {
      // No animation — show everything immediately
      setVisibleUpTo(trail.length);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  // Only re-run when trail reference or animating flag changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trail, animating]);

  const visibleTrail = trail.slice(0, visibleUpTo);
  const rocketPos = visibleTrail[visibleTrail.length - 1];

  const cells = Array.from({ length: size * size }, (_, i) => {
    const x = i % size;
    const y = size - 1 - Math.floor(i / size);
    const isGoal = x === goal.x && y === goal.y;
    const inTrail = visibleTrail.some((s) => s.x === x && s.y === y);
    const isRocket = rocketPos && rocketPos.x === x && rocketPos.y === y;
    return (
      <div
        key={i}
        className={[
          "aspect-square rounded-lg border-2 border-border flex items-center justify-center text-2xl transition-all duration-200",
          inTrail ? "bg-primary/15" : "bg-card",
          isGoal ? "bg-accent/30 border-accent" : "",
          isRocket ? "scale-110" : "",
        ].join(" ")}
      >
        {isRocket
          ? <span className={animating ? "animate-[bob_0.5s_ease-in-out_infinite]" : ""}>🚀</span>
          : isGoal
          ? "🌙"
          : ""}
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
