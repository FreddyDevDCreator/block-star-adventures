import type { Attempt } from "@/services/db";

export function getLearningStatus(successRate: number): string {
  if (successRate === 1) return "Mastered 🚀";
  if (successRate >= 0.7) return "Getting Good 👍";
  if (successRate >= 0.4) return "Keep Trying 💪";
  return "Needs Help 🧠";
}

export function getImprovementHint(attempts: Attempt[], challengeId: string): string {
  const list = attempts.filter((a) => a.challengeId === challengeId);
  const last3 = list.slice(-3);

  if (last3.length < 2) return "Keep going!";

  const first = last3[0];
  const last = last3[last3.length - 1];

  if (last.timeTaken < first.timeTaken) {
    return "You are getting faster! ⚡";
  }

  if (last.success && !first.success) {
    return "Nice! You figured it out 🎉";
  }

  return "Try again, you can do better 💪";
}
