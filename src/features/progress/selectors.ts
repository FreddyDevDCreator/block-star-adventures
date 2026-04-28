import type { Attempt } from "@/services/db";

export function getAttemptsForChallenge(
  attempts: Attempt[],
  challengeId: string,
): Attempt[] {
  return attempts.filter((a) => a.challengeId === challengeId);
}

export function getSuccessRate(attempts: Attempt[], challengeId: string): number {
  const list = getAttemptsForChallenge(attempts, challengeId);
  if (list.length === 0) return 0;

  const success = list.filter((a) => a.success).length;
  return success / list.length;
}

export function getAverageTime(attempts: Attempt[], challengeId: string): number {
  const successAttempts = getAttemptsForChallenge(attempts, challengeId).filter(
    (a) => a.success,
  );

  if (successAttempts.length === 0) return 0;

  const total = successAttempts.reduce((sum, a) => sum + a.timeTaken, 0);
  return total / successAttempts.length;
}

export function getEfficiency(attempts: Attempt[], challengeId: string): number {
  const successAttempts = getAttemptsForChallenge(attempts, challengeId).filter(
    (a) => a.success,
  );

  if (successAttempts.length === 0) return 0;

  const totalMoves = successAttempts.reduce((sum, a) => sum + a.movesUsed, 0);
  return totalMoves / successAttempts.length;
}

