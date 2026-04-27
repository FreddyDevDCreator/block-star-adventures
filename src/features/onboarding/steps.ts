export interface OnboardingStep {
  title: string;
  message: string;
  emoji: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: "Eiii, welcome!",
    message: "I am Bolt — your coding partner! Together we will reach the moon. Are you ready, my friend?",
    emoji: "👋",
  },
  {
    title: "Read the story",
    message: "Each lesson is a short picture story. Tap Next to see the next panel — easy like that!",
    emoji: "📖",
  },
  {
    title: "Snap the blocks",
    message: "Drag the colourful blocks and connect them together. No writing — just clicking and snapping!",
    emoji: "🧩",
  },
  {
    title: "Win your rewards",
    message: "Finish the challenge and collect coins, points and badges. Show everyone what you can do!",
    emoji: "🏆",
  },
];
