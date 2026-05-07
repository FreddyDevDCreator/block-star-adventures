import type { Attempt } from "@/services/db";

export function getAttemptsForChallenge(attempts: Attempt[], challengeId: string): Attempt[] {
  return attempts.filter((a) => a.challengeId === challengeId);
}

export function getSuccessRate(attempts: Attempt[], challengeId: string): number {
  const list = getAttemptsForChallenge(attempts, challengeId);
  if (list.length === 0) return 0;

  const success = list.filter((a) => a.success).length;
  return success / list.length;
}

export function getAverageTime(attempts: Attempt[], challengeId: string): number {
  const list = getAttemptsForChallenge(attempts, challengeId);

  if (list.length === 0) return 0;

  // Average over recent attempts so kids see progress even before first success.
  const recent = list.slice(-5);
  const total = recent.reduce((sum, a) => sum + a.timeTaken, 0);
  return total / recent.length;
}

export function getEfficiency(attempts: Attempt[], challengeId: string): number {
  const list = getAttemptsForChallenge(attempts, challengeId);

  if (list.length === 0) return 0;

  const recent = list.slice(-5);
  const totalMoves = recent.reduce((sum, a) => sum + a.movesUsed, 0);
  return totalMoves / recent.length;
}
