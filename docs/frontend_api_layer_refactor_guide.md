# Frontend API Layer Refactor — Implementation Guide

## Overview

This guide standardizes how the frontend communicates with the backend by introducing a **centralized API layer**.

> Goal: Replace scattered `fetch("http://localhost:5000/...")` calls with a clean, reusable, environment-aware API system.

---

## Why This Matters

Without an API layer:

- Hardcoded URLs everywhere ❌
- Difficult to switch environments ❌
- Repeated logic (headers, error handling) ❌

With an API layer:

- Centralized configuration ✅
- Cleaner services ✅
- Easy deployment (dev → production) ✅

---

## Step 1 — Create API Config

Create:

```
/src/services/api.ts
```

### Implementation

```ts
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

---

## Step 2 — Add Environment Variable

Create `.env` (frontend root):

```
VITE_API_URL=http://localhost:5000/api
```

> Later, change this for production without touching code.

---

## Step 3 — Refactor User Service

### File: `/src/services/users.ts`

```ts
import { API_BASE_URL } from "./api";

export async function createUser(payload: {
  name: string;
  avatar: string;
  ageGroup: string;
}) {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
}
```

---

## Step 4 — Refactor Sync Service

### File: `/src/services/sync.ts`

Replace hardcoded URL:

```ts
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/attempts/bulk`;
```

---

## Step 5 — (Optional) Add Base Fetch Wrapper

Create helper (optional but recommended):

```ts
export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
```

Then use it in services.

---

## Step 6 — Verify Everything Works

Test:

- User creation (`POST /users`)
- Attempt sync (`POST /attempts/bulk`)

---

## Expected Outcome

- No hardcoded backend URLs in components
- All API calls go through `/services`
- Easy environment switching via `.env`

---

## Important Rules

- Do NOT call `fetch()` directly inside components
- Always go through `/services`
- Keep services focused (users, sync, etc.)

---

## Your Task (Required Response)

After implementing, reply with:

1. Your `api.ts`
2. Your updated `users.ts`
3. Your updated `sync.ts`

---

## Next Step

After this:

👉 Add **sync status UI (offline / syncing / synced)**
👉 Final system polish for demo + submission

---

## Summary

You now introduce:

- Clean API layer
- Environment-based configuration
- Scalable frontend-backend communication

This aligns your project with **real production architecture**.

