# Frontend Hydration Strategy — Implementation Guide

## Overview

Before implementing the backend, the frontend must establish a **stable application lifecycle**. This ensures that all state is loaded, consistent, and predictable before any UI or future backend interaction occurs.

This document explains why hydration is required and how to implement it correctly.

---

## Why This Step Is Critical

Your application is **offline-first** and currently uses IndexedDB as a temporary source of truth.

If hydration is not properly controlled:

- UI may render with incomplete data
- State may be inconsistent across components
- Future backend sync will introduce race conditions
- Progress, rewards, or user data may reset or duplicate

Hydration ensures:

- deterministic app startup
- consistent state across all stores
- safe foundation for backend integration

---

## Problem to Solve

Currently, each Zustand store hydrates independently.

This creates a scenario where:

- some stores are ready
- others are still loading
- UI renders anyway

This leads to flickering, incorrect data display, and hard-to-debug issues.

---

## Solution: Centralized Hydration Control

Introduce a **single hydration orchestrator** that:

- loads all stores
- waits for completion
- signals when the app is ready

---

## Implementation Steps

### 1. Create Hydration Hook

Create a new file:

```
/src/hooks/useAppHydration.ts
```

### Implementation

```ts
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useProgressStore } from "@/store/useProgressStore";
import { useSettingsStore } from "@/store/useSettingsStore";

export function useAppHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  const hydrateUser = useUserStore((s) => s.hydrateUser);
  const hydrateProgress = useProgressStore((s) => s.hydrateProgress);
  const hydrateSettings = useSettingsStore((s) => s.hydrateSettings);

  useEffect(() => {
    async function hydrate() {
      await Promise.all([
        hydrateUser(),
        hydrateProgress(),
        hydrateSettings(),
      ]);

      setIsHydrated(true);
    }

    hydrate();
  }, []);

  return isHydrated;
}
```

---

### 2. Gate Application Rendering

In your root component (e.g. `App.tsx` or root route):

```ts
const isHydrated = useAppHydration();

if (!isHydrated) {
  return <LoadingScreen />;
}
```

---

### 3. Create a Simple Loading Screen

This should be:

- lightweight
- child-friendly
- fast to render

Example:

```tsx
export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen text-xl">
      Loading your adventure...
    </div>
  );
}
```

---

## Expected Outcome

After implementation:

- All stores are fully hydrated before UI renders
- No inconsistent or partial state appears
- UI becomes stable and predictable

---

## Why This Must Be Done Before Backend

The backend will rely on frontend state for:

- syncing user progress
- validating actions
- tracking analytics

If hydration is not controlled:

- incomplete data may be sent to backend
- race conditions will occur
- bugs will become harder to trace

With proper hydration:

- frontend becomes a reliable data source
- backend becomes simpler to implement

---

## What Not To Do

- Do not hydrate stores inside multiple components
- Do not allow UI to render before hydration completes
- Do not mix hydration logic into individual feature components

---

## Next Step After This

Once hydration is complete, proceed to:

1. Redesign progress tracking model
2. Align state with backend data schema (ERD)
3. Implement backend services

---

## Summary

This step establishes a **controlled application lifecycle**, which is essential for:

- offline-first reliability
- scalable architecture
- clean backend integration

Treat this as a foundational system upgrade, not a minor feature.

