export interface OnboardingStep {
  title: string;
  message: string;
  emoji: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: "Hi there!",
    message: "I'm Bolt. I'll help you become a coding hero. Ready for an adventure?",
    emoji: "👋",
  },
  {
    title: "Read comics",
    message: "Each lesson is a tiny comic. Tap Next to flip through the panels.",
    emoji: "📖",
  },
  {
    title: "Snap blocks",
    message: "Drag colorful blocks together to write code — no typing needed!",
    emoji: "🧩",
  },
  {
    title: "Earn rewards",
    message: "Solve challenges to win coins, XP and shiny badges. Let's go!",
    emoji: "🏆",
  },
];
