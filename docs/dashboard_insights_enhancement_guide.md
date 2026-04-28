# Dashboard Insights Enhancement — Implementation Guide

## Overview

You already compute derived metrics (selectors). This step upgrades your dashboard from showing **raw numbers** to delivering **interpretable insights** for both children and evaluation (Chapter 4).

> Goal: turn metrics into **meaningful feedback** (status + improvement hints).

---

## What You Will Add

### Required Metrics (existing)
- Success Rate (%)
- Average Time (seconds)
- Efficiency (average moves)
- Attempts (count)

### New (must add)
- **Learning Status** (interpreted label)
- **Improvement Hint** (recent trend)

---

## File Locations

```
src/routes/dashboard.tsx
src/features/progress/interpretation.ts (new)
src/components/cq/StatsCard.tsx
```

---

## 1) Interpretation Layer (NEW)

Create:

```
src/features/progress/interpretation.ts
```

### A. Learning Status

```ts
export function getLearningStatus(successRate: number): string {
  if (successRate === 1) return "Mastered 🚀";
  if (successRate >= 0.7) return "Getting Good 👍";
  if (successRate >= 0.4) return "Keep Trying 💪";
  return "Needs Help 🧠";
}
```

### B. Improvement Hint (simple trend)

```ts
import { Attempt } from "@/features/progress/selectors";

export function getImprovementHint(
  attempts: Attempt[],
  challengeId: string
): string {
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
```

---

## 2) Format Values for Kids

```ts
const pct = Math.round(successRate * 100);
const seconds = Math.round(avgTimeMs / 1000);
```

Display:
- `72%` (not 0.72)
- `3s` (not 3000ms)

---

## 3) UI Integration (Dashboard)

```ts
import {
  getSuccessRate,
  getAverageTime,
  getEfficiency,
  getAttemptsForChallenge,
} from "@/features/progress/selectors";

import {
  getLearningStatus,
  getImprovementHint,
} from "@/features/progress/interpretation";

const attempts = useProgressStore((s) => s.attempts);

const successRate = getSuccessRate(attempts, challengeId);
const avgTimeMs = getAverageTime(attempts, challengeId);
const efficiency = getEfficiency(attempts, challengeId);
const attemptsCount = getAttemptsForChallenge(attempts, challengeId).length;

const status = getLearningStatus(successRate);
const hint = getImprovementHint(attempts, challengeId);
```

---

## 4) Display Example

```tsx
<div className="grid grid-cols-2 gap-3">
  <StatsCard label="Success" value={`${pct}%`} />
  <StatsCard label="Speed" value={`${seconds}s`} />
  <StatsCard label="Moves" value={`${efficiency.toFixed(1)}`} />
  <StatsCard label="Attempts" value={`${attemptsCount}`} />
</div>

<div className="mt-4 text-center">
  <div className="text-xl font-bold">{status}</div>
  <div className="text-sm opacity-70">{hint}</div>
</div>
```

---

## UX Guidelines (Important)

- Use simple words: **Speed, Moves, Wins**
- Big fonts, minimal text
- Add icons (⭐ ⏱️ 🚀)
- Friendly tone (encouraging, not technical)

---

## Constraints

- Do not add charts yet
- Do not change rewards yet
- Do not introduce backend calls

---

## Expected Outcome

- Dashboard shows meaningful insights
- Kids understand their performance
- Data becomes interpretable for evaluation

---

## Chapter 4 (Use This Language)

> "The system translated performance metrics into interpretable feedback such as mastery levels and improvement indicators, enhancing both user engagement and usability."

---

## Next Step (Do Not Start Yet)

👉 Derive rewards (XP, coins, badges) from performance metrics

---

## Summary

- Metrics → Interpretation → Feedback
- UI becomes meaningful, not just informative
- System supports both **learning** and **evaluation**

Implement this before moving to reward derivation.

