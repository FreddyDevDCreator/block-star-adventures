# Frontend State Architecture Refactor Guide

## Overview

Your current frontend implementation is strong and already aligns well with your system design. However, your state management approach needs to be improved to ensure scalability, maintainability, and alignment with production-level architecture.

This guide outlines a **focused refactor** to improve your Zustand state structure.

---

## Current Problem

Your Zustand store currently handles multiple responsibilities:

- User profile data
- Progress tracking
- Reward system
- Sound settings
- Persistence logic

This creates a **"god object" store**, which will lead to:

- Difficult debugging
- Tight coupling between unrelated features
- Risk of accidental state overwrites
- Poor scalability as features grow

---

## Target Architecture

Refactor your state into **domain-specific stores**.

```
/store
  useUserStore.ts
  useProgressStore.ts
  useSettingsStore.ts
```

---

## Responsibilities by Store

### 1. useUserStore

Handles identity-related data:

```ts
- name
- avatar
- ageGroup
```

---

### 2. useProgressStore

Handles learning and gameplay progression:

```ts
- completedLessons
- attempts
- rewards
- coins
```

---

### 3. useSettingsStore

Handles user preferences:

```ts
- soundOn
- toggleSound()
```

---

## First Refactor Task (Start Here)

Do NOT refactor everything at once.

### Step 1: Extract Sound Settings

Create a new file:

```
/store/useSettingsStore.ts
```

### Example Implementation

```ts
import { create } from "zustand";

interface SettingsState {
  soundOn: boolean;
  toggleSound: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  soundOn: true,
  toggleSound: () =>
    set((state) => ({ soundOn: !state.soundOn })),
}));
```

---

## Step 2: Update Usage

Update the following files to use the new store:

- `useSpeak.ts`
- `SoundToggle.tsx`

Replace references from your main store with:

```ts
const { soundOn, toggleSound } = useSettingsStore();
```

---

## Why This Matters

### 1. Maintainability
Each store has a single responsibility, making it easier to debug and extend.

### 2. Scalability
You can add new features (analytics, syncing, multiplayer) without breaking existing logic.

### 3. Clean Architecture (For Project Defense)

You can confidently explain:

> "State management was modularized into domain-specific stores to reduce coupling and improve scalability."

---

## What NOT To Do

- Do not move everything at once
- Do not mix persistence logic with UI logic
- Do not reintroduce cross-dependencies between stores

---

## Next Steps (After This Refactor)

Once this is complete, the next improvements will be:

1. Refactor progress tracking model
2. Improve lesson engine structure
3. Align frontend state with backend data model (ERD)

---

## Final Note

This is not just a refactor — it is a shift toward **production-grade frontend architecture**.

Treat your codebase like a real product, not just a project.

