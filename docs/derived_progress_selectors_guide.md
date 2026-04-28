# Derived Progress Selectors — Implementation Guide

## Overview

You now collect high-quality, append-only `Attempt` data. The next step is to **derive meaningful metrics** from this data without mutating state. These selectors power evaluation (Chapter 4) and later UI/analytics.

---

## Key Principle

Selectors are **pure, read-only functions**:

- ❌ No state mutation
- ❌ No persistence
- ❌ No side effects
- ✅ Deterministic outputs from inputs

---

## File Location

Create:

```
/src/features/progress/selectors.ts
```

---

## Types (optional but recommended)

```ts
export type Attempt = {
  id: string;
  challengeId: string;
  success: boolean;
  timeTaken: number;   // ms
  movesUsed: number;   // steps/blocks
  createdAt: number;   // timestamp
};
```

---

## Selectors

### 1) Attempts for a Challenge

```ts
export function getAttemptsForChallenge(
  attempts: Attempt[],
  challengeId: string
): Attempt[] {
  return attempts.filter((a) => a.challengeId === challengeId);
}
```

---

### 2) Success Rate

```ts
export function getSuccessRate(
  attempts: Attempt[],
  challengeId: string
): number {
  const list = getAttemptsForChallenge(attempts, challengeId);
  if (list.length === 0) return 0;

  const success = list.filter((a) => a.success).length;
  return success / list.length; // 0..1
}
```

---

### 3) Average Time to Solve (successful attempts only)

```ts
export function getAverageTime(
  attempts: Attempt[],
  challengeId: string
): number {
  const successAttempts = getAttemptsForChallenge(attempts, challengeId)
    .filter((a) => a.success);

  if (successAttempts.length === 0) return 0;

  const total = successAttempts.reduce((sum, a) => sum + a.timeTaken, 0);
  return total / successAttempts.length; // ms
}
```

---

### 4) Efficiency (moves used on successful attempts)

```ts
export function getEfficiency(
  attempts: Attempt[],
  challengeId: string
): number {
  const successAttempts = getAttemptsForChallenge(attempts, challengeId)
    .filter((a) => a.success);

  if (successAttempts.length === 0) return 0;

  const totalMoves = successAttempts.reduce((sum, a) => sum + a.movesUsed, 0);
  return totalMoves / successAttempts.length; // average moves
}
```

---

## Usage (Example)

```ts
import { useProgressStore } from "@/store/useProgressStore";
import {
  getSuccessRate,
  getAverageTime,
  getEfficiency,
} from "@/features/progress/selectors";

const attempts = useProgressStore((s) => s.attempts);

const successRate = getSuccessRate(attempts, challengeId);
const avgTime = getAverageTime(attempts, challengeId);
const efficiency = getEfficiency(attempts, challengeId);
```

---

## Constraints (Important)

- Do not update UI yet
- Do not refactor rewards yet
- Do not add backend logic
- Keep selectors simple and correct

---

## Expected Outcome

After this step, you can compute:

- Attempts per challenge
- Success rate (0–1)
- Average time to completion (ms)
- Efficiency (average moves)

---

## Chapter 4 Impact

You can now report measurable learning metrics:

- Attempts before success
- Time-to-completion trends
- Efficiency improvements

> "The system derived performance metrics such as success rate, time-to-completion, and efficiency from user attempts to evaluate engagement and learning progression."

---

## Next Steps (Do not start yet)

1. Connect selectors to UI (dashboard/results)
2. Derive XP/coins/badges from metrics
3. Add analytics summaries/visualizations

---

## Summary

- Attempts are the **source of truth**
- Selectors provide **read-only intelligence**
- This enables **evaluation, analytics, and scalable design**

Implement selectors first before any UI or reward changes.

