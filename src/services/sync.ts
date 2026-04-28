import { useProgressStore } from "@/store/useProgressStore";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/attempts/bulk`;

export async function syncAttempts(userId: string): Promise<void> {
  const { attempts, setAttempts, setSyncStatus } = useProgressStore.getState();
  const unsynced = attempts.filter((a) => !a.synced);
  if (unsynced.length === 0) {
    setSyncStatus("synced");
    return;
  }

  setSyncStatus("syncing");

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
    setSyncStatus("synced");
  } catch {
    setSyncStatus("offline");
  }
}

