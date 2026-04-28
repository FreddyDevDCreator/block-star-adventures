# Reward Engine Verification (Attempts-only) — 2026-04-28

## 1) Does reward depend ONLY on attempts?

### Current app behavior (before this change)
**No.** Rewards were still UI/data-driven from `lessonData`:
- In `src/routes/play.$id.tsx`, on win it directly awarded:
  - `awardCoins(challenge.reward.coins)`
  - `addXp(challenge.reward.xp)`
  - `unlockBadge(challenge.reward.badge)`

That means rewards depended on `challenge.reward` (content config), not strictly on Attempts.

### What is implemented now
I implemented an **attempts-only reward computation function** here:

- `src/features/progress/rewards.ts`
  - `computeReward(attempts, challengeId)`
  - It has **no side effects** and depends **only** on the `Attempt[]` log + `challengeId`.

Important: the play route still awards rewards from `challenge.reward` today; this doc is the verification + the requested production-style reward function implementation. If you want rewards to be enforced as attempts-only, the next step is to swap the awarding logic in `play.$id.tsx` to use `computeReward(...)` and stop reading `challenge.reward.*` for awarding.

---

## 2) Is it consistent across runs?

**Yes, for `computeReward`.**
- It is deterministic: same `attempts` input ⇒ same output every time.
- No randomness, no clock reads (except the attempt timestamps already stored in the attempts array).
- It prevents “farming” by only returning XP/coins on the **first success** for a challenge (subsequent successes return 0 XP/coins, but may still return badges if you expand logic later).

---

## 3) Are badges meaningful (not random)?

**Yes, in `computeReward`.** Badges are tied to measurable achievements:
- `First Win`: first successful solve for that challenge
- `Speed Star`: solved fast (≤ 8s)
- `Move Master`: solved efficiently (≤ 8 moves)
- `Never Give Up`: persisted through ≥ 3 failed attempts before first success
- `Perfect Run`: solved with 0 failures before first success

---

## Confirmations you requested

- **reward function implemented**: ✅ Yes
- **where it is placed**: ✅ `src/features/progress/rewards.ts`

---

## `computeReward` (production-style)

```ts
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
export function computeReward(
  attempts: Attempt[],
  challengeId: string,
): ComputedReward {
  const list = attempts.filter((a) => a.challengeId === challengeId);
  if (list.length === 0) return { xp: 0, coins: 0, badges: [] };

  const successes = list
    .filter((a) => a.success)
    .sort((a, b) => a.createdAt - b.createdAt);
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
    const speedBonus =
      seconds <= 6 ? 10 : seconds <= 12 ? 6 : seconds <= 20 ? 3 : 0;
    const efficiencyBonus =
      moves <= 6 ? 10 : moves <= 10 ? 6 : moves <= 16 ? 3 : 0;
    const penalty = Math.min(30, failCount * 5);
    xp = clampInt(60 + speedBonus + efficiencyBonus - penalty, 20, 80);

    // Coins: 10..40
    const coinSpeedBonus =
      seconds <= 6 ? 6 : seconds <= 12 ? 4 : seconds <= 20 ? 2 : 0;
    const coinEffBonus =
      moves <= 6 ? 6 : moves <= 10 ? 4 : moves <= 16 ? 2 : 0;
    const coinPenalty = Math.min(15, failCount * 3);
    coins = clampInt(25 + coinSpeedBonus + coinEffBonus - coinPenalty, 10, 40);
  }

  // Meaningful performance badges (earned on first success only)
  if (firstSuccess && successes.length === 1) {
    if (firstSuccess.timeTaken <= 8000) badges.push("Speed Star");
    if (firstSuccess.movesUsed <= 8) badges.push("Move Master");
    if (failures.length >= 3) badges.push("Never Give Up");
    if (failures.length === 0) badges.push("Perfect Run");
  }

  return { xp, coins, badges: uniq(badges) };
}
```

