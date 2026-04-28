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
