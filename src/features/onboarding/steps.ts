export interface OnboardingStep {
  title: string;
  message: string;
  emoji: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: "Eiii, welcome!",
    message:
      "I’m Bolt — your rocket buddy! Today we’re helping learn to code with Bolt. Ready to take your first flight across Africa’s sky?",
    emoji: "👋",
  },
  {
    title: "Meet the story",
    message:
      "Every lesson is like a mini-comic. Coach will show the next scene, and you’ll level up step by step. Tap Next to continue!",
    emoji: "📖",
  },
  {
    title: "Snap the blocks",
    message:
      "Drag the colourful blocks and snap them together like beads on a necklace. No long writing — just play, learn, and try again!",
    emoji: "🧩",
  },
  {
    title: "Win your rewards",
    message:
      "Finish the mission and collect coins, XP, and badges. Your progress will save automatically — even when there is no internet.",
    emoji: "🏆",
  },
];
