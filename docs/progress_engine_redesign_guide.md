# Progress Engine Redesign — Implementation Guide

## Overview

This guide upgrades your current progress system from a UI-focused model to a **learning-analytics–driven model**. The goal is to align your implementation with your ERD (Attempt, Progress, Reward) and strengthen Chapter 4 evaluation.

---

## Why This Change Is Needed

Current model (simplified):

```ts
xp, level, coins, badges
completedScenes, completedChallenges
attempts
```

### Problems
- Flat, UI-driven state
- Limited insight into learning behavior
- Hard to evaluate improvement over time
- Difficult to sync reliably with a backend later

---

## Target Model (Core Entities)

### 1) Attempt (Primary Source of Truth)

Every user action on a challenge should produce an Attempt record.

```ts
type Attempt = {
  id: string;
  challengeId: string;
  success: boolean;
  timeTaken: number;   // ms
  movesUsed: number;   // number of blocks / steps
  createdAt: number;   // timestamp
};
```

> **Rule:** Attempts are append-only. Do not overwrite past attempts.

---

### 2) Progress (Derived / Aggregated)

```ts
type Progress = {
  lessonId: string;
  completed: boolean;
  score: number; // derived from attempts
};
```

---

### 3) Reward (Derived, not primary)

```ts
type Reward = {
  coins: number;
  badges: string[];
};
```

> XP, coins, badges should be **computed from Attempts + Progress**, not stored as the primary source of truth.

---

## Step 1 — Implement Structured Attempt (Do this first only)

### File
```
src/store/useProgressStore.ts
```

### Add / Replace Attempt type

```ts
type Attempt = {
  id: string;
  challengeId: string;
  success: boolean;
  timeTaken: number;
  movesUsed: number;
  createdAt: number;
};
```

### Store shape (minimum)

```ts
interface ProgressState {
  attempts: Attempt[];
  recordAttempt: (attempt: Attempt) => void;
}
```

### Action

```ts
recordAttempt: (attempt) =>
  set((state) => ({
    attempts: [...state.attempts, attempt],
  })),
```

---

## Step 2 — Capture Attempt Data in Play Flow

### File
```
src/routes/play.$id.tsx
```

### What to capture

- Start time when user clicks **Run**
- End time when animation finishes
- Success / failure result
- Number of moves (blocks used)

### Example (conceptual)

```ts
const [startTime, setStartTime] = useState<number | null>(null);

function onRun() {
  setStartTime(Date.now());
  // run simulation
}

function onAnimationEnd(result: { success: boolean; movesUsed: number }) {
  if (!startTime) return;

  const timeTaken = Date.now() - startTime;

  recordAttempt({
    id: crypto.randomUUID(),
    challengeId,
    success: result.success,
    timeTaken,
    movesUsed: result.movesUsed,
    createdAt: Date.now(),
  });
}
```

### How to compute `movesUsed`
- Count number of executed blocks (or steps in your `trail` array)
- Keep it consistent per challenge

---

## Constraints (Important)

- Do **not** refactor rewards yet
- Do **not** remove XP/coins yet
- Do **not** add backend calls yet
- Keep changes minimal and focused on Attempts only

---

## Expected Outcome

After this step:

- Every interaction is recorded
- You can measure:
  - attempts before success
  - time to solve
  - efficiency (moves used)
- Data becomes usable for analytics and evaluation

---

## How This Improves Chapter 4

You can now report:

- Average attempts per challenge
- Time-to-completion improvements
- Engagement metrics (retries, persistence)

This turns your project into a **measurable learning system**, not just an app.

---

## Next Steps (Do not start yet)

1. Derive XP / coins / badges from Attempts
2. Build analytics summaries (charts, metrics)
3. Align backend schema with Attempt/Progress model

---

## Summary

- Attempts become the **single source of truth**
- Progress and rewards become **derived layers**
- System becomes scalable, measurable, and research-aligned

Focus on implementing Attempt correctly before moving forward.

