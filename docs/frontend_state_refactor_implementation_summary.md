# Frontend State Refactor — Implementation Summary

Date: 2026-04-28

This document summarizes what was implemented to complete the refactor described in `docs/frontend_state_architecture_refactor_guide.md`, plus a follow-up improvement to narration voice selection.

---

## 1) Zustand state architecture refactor (completed)

### Goal
Replace the single “god store” approach with **domain-specific Zustand stores** for scalability and maintainability.

### What changed

- **Added a shared persistence helper**
  - **File**: `src/store/profilePersistence.ts`
  - **Purpose**: lets each domain store persist only its own slice by saving a *patch* into the persisted profile (no cross-store imports needed).

- **Created `useUserStore` (identity + onboarding)**
  - **File**: `src/store/useUserStore.ts`
  - **Owns**:
    - `name`
    - `avatar`
    - `ageGroup`
    - `onboarded`
  - **Actions**:
    - `hydrateUser()`
    - `setName()`, `setAvatar()`, `setAgeGroup()`
    - `finishOnboarding()`

- **Created `useProgressStore` (progress + rewards)**
  - **File**: `src/store/useProgressStore.ts`
  - **Owns**:
    - `xp`, `level`
    - `coins`
    - `badges`
    - `completedScenes`, `completedChallenges`
    - `attempts`
  - **Actions**:
    - `hydrateProgress()`
    - `awardCoins()`, `addXp()`
    - `unlockBadge()`
    - `completeScene()`, `completeChallenge()`
    - `recordAttempt()`
  - **Helpers** (moved here):
    - `xpForNextLevel()`
    - `xpProgress()`

- **Kept `useSettingsStore` as the settings domain store**
  - **File**: `src/store/useSettingsStore.ts`
  - **Owns**:
    - `soundOn`
  - **Actions**:
    - `hydrateSettings()`
    - `toggleSound()`
  - **Update**: switched persistence to use the shared patch helper (`persistProfilePatch`) rather than reading/saving the whole profile inside the settings store.

- **Removed the legacy god-store**
  - **Deleted file**: `src/store/useGameStore.ts`
  - **Reason**: all consumers were migrated to the domain stores, so the old store would only create confusion and accidental coupling.

---

## 2) Persistence model updates (completed)

### Updated persisted profile shape
- **File**: `src/services/db.ts`
- **Update**: `UserProfile` now includes:
  - `avatar: string`
  - `ageGroup: "kid" | "teen"`

### Backward compatibility
Existing saved profiles (IndexedDB) are upgraded by merging with `defaultProfile` in `loadProfile()`, so missing new fields get safe defaults.

---

## 3) App wiring / hydration updates (completed)

### Boot hydration now hydrates all domains
- **File**: `src/routes/index.tsx`
- **Behavior**: hydrates `useUserStore`, `useProgressStore`, and `useSettingsStore` in parallel on app start.

### Route migrations away from `useGameStore`
- **Dashboard**
  - **File**: `src/routes/dashboard.tsx`
  - **Now reads**:
    - progress from `useProgressStore`
    - user name from `useUserStore`
- **Onboarding**
  - **File**: `src/routes/onboarding.tsx`
  - **Now uses**: `useUserStore.finishOnboarding()`
- **Lesson page**
  - **File**: `src/routes/lesson.$id.tsx`
  - **Now uses**: `useProgressStore.completeScene()` and `useProgressStore.addXp()`
- **Play challenge**
  - **File**: `src/routes/play.$id.tsx`
  - **Now uses**: progress actions from `useProgressStore`
- **Rewards**
  - **File**: `src/routes/rewards.tsx`
  - **Now reads**: `badges` from `useProgressStore`

---

## 4) Narration voice update (African + female preferred)

### Goal
Make narration sound more relatable for Nigerians/Africans, **preferably a female voice**, while keeping robust fallbacks across browsers/devices.

### Implementation
- **File**: `src/services/audio.ts`
- **Behavior**:
  - Prefers `en-NG` voices first (female first when inferred by voice name)
  - Falls back to other African English locales (female first)
  - Then `en-GB` (female first)
  - Then any other `en-*` voice (female first)

Note: the Web Speech API does not expose standardized gender metadata; “female” is inferred from common patterns in voice names.

---

## 5) Verification performed

- Project build completed successfully (`npm run build`).
- No lint issues were reported in the files touched for this refactor (checked file-scoped diagnostics).

---

## 6) What’s still optional (nice-to-have)

- Add a small UI screen to let the player set:
  - `name`
  - `avatar`
  - `ageGroup`
  (the state + persistence support is implemented; it’s just not surfaced in the UI yet).

