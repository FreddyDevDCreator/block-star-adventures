import confetti from "canvas-confetti";

export function useConfetti() {
  return () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#fbbf24", "#34d399", "#f472b6"],
    });
  };
}
