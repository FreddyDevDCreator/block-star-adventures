import type { Attempt } from "@/services/db";

export type ComputedReward = {
  xp: number;
  coins: number;
  badges: string[];
};

function clampInt(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function uniq(list: string[]): string[] {
  return Array.from(new Set(list));
}

/**
 * Deterministically computes rewards from attempts only.
 *
 * Design goals:
 * - Depends ONLY on attempts (no UI inputs)
 * - Stable across runs (same attempts => same reward)
 * - Badges are meaningful (earned for clear achievements)
 *
 * Notes:
 * - Rewards are derived for a single challengeId from the user's attempt history.
 * - Returns the "delta to award now": primarily the reward for the FIRST success.
 *   (Subsequent successes return 0 xp/coins, but can still grant new badges.)
 */
export function computeReward(attempts: Attempt[], challengeId: string): ComputedReward {
  const list = attempts.filter((a) => a.challengeId === challengeId);
  if (list.length === 0) return { xp: 0, coins: 0, badges: [] };

  const successes = list.filter((a) => a.success).sort((a, b) => a.createdAt - b.createdAt);
  const failures = list.filter((a) => !a.success);
  const firstSuccess = successes[0] ?? null;

  const badges: string[] = [];

  // Badge: first ever attempt on this challenge (engagement)
  if (list.length === 1) badges.push("Tried It");

  // Only compute main reward when the user has their FIRST success.
  // This keeps rewards consistent and prevents farming by re-running.
  let xp = 0;
  let coins = 0;
  if (firstSuccess && successes.length === 1) {
    badges.push("First Win");

    // Base derived rewards (bounded)
    // Faster + fewer moves => more reward; many failures => less.
    const moves = Math.max(0, firstSuccess.movesUsed);
    const seconds = Math.max(0, firstSuccess.timeTaken / 1000);
    const failCount = failures.length;

    // XP: 20..80
    // - start at 60
    // - minus 5 per failure (up to 30)
    // - plus up to +10 for speed and +10 for efficiency
    const speedBonus = seconds <= 6 ? 10 : seconds <= 12 ? 6 : seconds <= 20 ? 3 : 0;
    const efficiencyBonus = moves <= 6 ? 10 : moves <= 10 ? 6 : moves <= 16 ? 3 : 0;
    const penalty = Math.min(30, failCount * 5);
    xp = clampInt(60 + speedBonus + efficiencyBonus - penalty, 20, 80);

    // Coins: 10..40 (a little more generous, but still bounded)
    const coinSpeedBonus = seconds <= 6 ? 6 : seconds <= 12 ? 4 : seconds <= 20 ? 2 : 0;
    const coinEffBonus = moves <= 6 ? 6 : moves <= 10 ? 4 : moves <= 16 ? 2 : 0;
    const coinPenalty = Math.min(15, failCount * 3);
    coins = clampInt(25 + coinSpeedBonus + coinEffBonus - coinPenalty, 10, 40);
  }

  // Meaningful performance badges (can be earned on first success only)
  if (firstSuccess && successes.length === 1) {
    if (firstSuccess.timeTaken <= 8000) badges.push("Speed Star");
    if (firstSuccess.movesUsed <= 8) badges.push("Move Master");
    if (failures.length >= 3) badges.push("Never Give Up");
    if (failures.length === 0) badges.push("Perfect Run");
  }

  return { xp, coins, badges: uniq(badges) };
}
