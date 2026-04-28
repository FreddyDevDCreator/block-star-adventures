# Sync Status UI & Final System Polish — Implementation Guide

## Overview

You now have a fully working offline-first system with backend sync.

This final step adds **user-visible feedback** and **polish** so your system feels complete and is strong for demo + submission.

---

## Goals

- Show sync status to the user
- Improve trust and usability
- Prepare clean demo experience
- Strengthen Chapter 4 presentation

---

## Step 1 — Add Sync Status State

Update your progress store or create a lightweight sync state.

### Option A (simple - recommended)

Add to store:

```ts
syncStatus: "idle" | "syncing" | "synced" | "offline";
setSyncStatus: (status) => void;
```

---

## Step 2 — Update Sync Service

### File: `/src/services/sync.ts`

Enhance your function:

```ts
import { useProgressStore } from "@/store/useProgressStore";

export async function syncAttempts(userId: string): Promise<void> {
  const { attempts, setAttempts, setSyncStatus } = useProgressStore.getState();

  const unsynced = attempts.filter((a) => !a.synced);
  if (unsynced.length === 0) {
    setSyncStatus("synced");
    return;
  }

  setSyncStatus("syncing");

  try {
    const res = await fetch(`${API_BASE_URL}/attempts/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, attempts: unsynced }),
    });

    if (!res.ok) throw new Error();

    const updated = attempts.map((a) =>
      unsynced.some((u) => u.id === a.id)
        ? { ...a, synced: true }
        : a
    );

    setAttempts(updated);
    setSyncStatus("synced");

  } catch {
    setSyncStatus("offline");
  }
}
```

---

## Step 3 — Create Sync Status Component

Create:

```
/src/components/cq/SyncStatus.tsx
```

### Implementation

```tsx
import { useProgressStore } from "@/store/useProgressStore";

export function SyncStatus() {
  const status = useProgressStore((s) => s.syncStatus);

  if (!status || status === "idle") return null;

  const labelMap = {
    syncing: "Saving...",
    synced: "All progress saved ✅",
    offline: "Offline — will sync later",
  };

  return (
    <div className="text-xs text-center mt-2 opacity-70">
      {labelMap[status]}
    </div>
  );
}
```

---

## Step 4 — Add to UI

Place SyncStatus in:

- Dashboard
- Play screen

Example:

```tsx
<SyncStatus />
```

---

## Step 5 — UX Behavior

- When user plays offline → shows "Offline — will sync later"
- When syncing → "Saving..."
- When done → "All progress saved ✅"

---

## Step 6 — Demo Readiness Checklist

Before presenting your project:

- [ ] Landing page works
- [ ] Onboarding works
- [ ] Play → Attempt recorded
- [ ] Reward is computed
- [ ] Sync runs automatically
- [ ] Sync status is visible
- [ ] App works offline (disable internet and test)

---

## Chapter 4 (Use This)

> "The system provides real-time feedback on synchronization status, ensuring users are aware of whether their progress has been saved locally or synchronized with the backend. This improves usability in low-connectivity environments."

---

## Optional Enhancements (If Time Allows)

- Add icon animations (spinner while syncing)
- Show last sync time
- Add retry button (manual sync)

---

## Summary

You now have:

- Full offline-first system
- Reliable backend sync
- User feedback loop
- Production-level UX

This completes your system for:

- Demo
- Submission
- Real-world relevance

---

## Your Task (Required Response)

After implementing, send:

1. Your updated `syncAttempts`
2. Your store changes (syncStatus)
3. Where you placed `<SyncStatus />`

Then we’ll finalize your **Chapter 4 explanation + defense strategy**.

