# Backend scaffold reverted (frontend-only repo)

Date: 2026-04-28

## What happened

- A backend scaffold was **started by mistake** (a `backend/package.json` file was created).
- You clarified that this project must **not** contain backend code and should only **consume APIs**.

## What I did

- **Deleted**: `block-star-adventures/backend/package.json`
- **Did not add** any other backend files (no Express app, no Mongo/Mongoose code).

## Current intended setup (frontend-only)

- The frontend uses an environment-based API base URL:
  - **File**: `src/services/api.ts`
  - **Env var**: `VITE_API_URL` (set in `.env`)
- Backend endpoints are consumed only through `src/services/*` (e.g. `users.ts`, `sync.ts`).

---

## Requested snippets (as-is)

### `src/services/api.ts`

```ts
// Mock API. Simulates latency so swapping for a real backend later is a
// one-file change.
import type { UserProfile } from "./db";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function syncProgress(profile: UserProfile): Promise<{ ok: true }> {
  await delay(120);
  return { ok: true };
}

export async function fetchLessonManifest(): Promise<{ version: string }> {
  await delay(80);
  return { version: "1.0.0" };
}

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
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

  return (await res.json()) as T;
}
```

### `src/services/users.ts` (updated)

```ts
import { apiFetch } from "./api";

export type CreateUserPayload = {
  name: string;
  avatar: string;
  ageGroup: "kid" | "teen";
};

export async function createUser(
  payload: CreateUserPayload,
): Promise<{ userId: string }> {
  return await apiFetch<{ userId: string }>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
```

### `src/services/sync.ts` (updated)

```ts
import { useProgressStore } from "@/store/useProgressStore";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/attempts/bulk`;

export async function syncAttempts(userId: string): Promise<void> {
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

    if (!res.ok) throw new Error(`syncAttempts failed: ${res.status}`);
    await res.json().catch(() => null);

    const updated = attempts.map((a) =>
      unsynced.some((u) => u.id === a.id) ? { ...a, synced: true } : a,
    );

    setAttempts(updated);
  } catch {
    // Offline / backend down — safe to retry later.
    // No UI blocking and no attempt deletion.
  }
}
```

