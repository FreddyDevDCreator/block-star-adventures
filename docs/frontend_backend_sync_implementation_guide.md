# Frontend ↔ Backend Sync — Implementation Guide

## Overview

This step completes your system by connecting your **offline-first frontend** to your **idempotent backend**.

You will implement a **reliable sync mechanism** that:
- Stores attempts locally
- Sends unsynced attempts to the backend
- Marks attempts as synced
- Retries safely when network fails

---

## What You Will Implement

1. Add `synced` field to Attempt
2. Create `syncAttempts` service
3. Trigger sync from your app

---

## Step 1 — Extend Attempt Model (Frontend)

Update your Attempt type:

```ts
synced?: boolean;
```

### Full Example

```ts
type Attempt = {
  id: string;
  challengeId: string;
  success: boolean;
  timeTaken: number;
  movesUsed: number;
  createdAt: number;
  synced?: boolean;
};
```

---

## Step 2 — Create Sync Service

Create file:

```
/src/services/sync.ts
```

### Implementation

```ts
import { useProgressStore } from "@/store/useProgressStore";

const API_URL = "http://localhost:5000/api/attempts/bulk";

export async function syncAttempts(userId: string) {
  const { attempts, setAttempts } = useProgressStore.getState();

  const unsynced = attempts.filter((a) => !a.synced);

  if (unsynced.length === 0) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, attempts: unsynced }),
    });

    const data = await res.json();

    const updated = attempts.map((a) =>
      unsynced.find((u) => u.id === a.id)
        ? { ...a, synced: true }
        : a
    );

    setAttempts(updated);

  } catch (err) {
    console.log("Sync failed, will retry later");
  }
}
```

---

## Step 3 — Trigger Sync

### Option A (Start Here — Simple)

Call sync after:
- A successful attempt
- App startup

```ts
syncAttempts(userId);
```

---

### Option B (Optional — Later Improvement)

```ts
setInterval(() => {
  syncAttempts(userId);
}, 10000);
```

---

## Step 4 — Expected Behavior

- Only unsynced attempts are sent
- Backend ignores duplicates
- Synced attempts are marked locally
- Failed syncs retry later safely

---

## Important Rules

- Do NOT delete attempts after syncing
- Do NOT mutate attempts outside store
- Do NOT block UI during sync

---

## Why This Matters

You now support:

- Offline-first usage
- Reliable data syncing
- Idempotent backend communication

This is real-world distributed system behavior.

---

## Verification Checklist

Before proceeding, confirm:

- [ ] `synced` field added
- [ ] `syncAttempts` implemented
- [ ] Sync is triggered correctly
- [ ] No duplicate attempts appear in DB

---

## Your Task (Required Response)

Once you finish implementation, reply with:

### 1. Your sync function
Paste your `syncAttempts` implementation.

### 2. How you trigger sync
Explain where and when you call `syncAttempts`.

---

## Next Step

After verification:

👉 We will implement **user identity + auth layer**
👉 Then finalize system for full production flow

---

## Summary

- Added `synced` tracking
- Built sync service
- Enabled backend communication
- Established offline-first reliability

You now have a **complete end-to-end system**.

