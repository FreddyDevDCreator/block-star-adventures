import { useCallback } from "react";

export function useConfetti() {
  return useCallback(() => {
    // SSR / non-DOM guard
    if (typeof window === "undefined") return;

    void import("canvas-confetti")
      .then(({ default: confetti }) => {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#fbbf24", "#34d399", "#f472b6"],
        });
      })
      .catch(() => {
        // Confetti is a fun enhancement; ignore failures silently.
      });
  }, []);
}
