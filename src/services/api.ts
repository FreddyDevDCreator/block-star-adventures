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
