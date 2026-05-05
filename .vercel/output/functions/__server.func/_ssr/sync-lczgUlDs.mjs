import { u as useProgressStore } from "./useProgressStore-C8fAoGR_.mjs";
import { A as API_BASE_URL } from "./router-B1FQr5XI.mjs";
const API_URL = `${API_BASE_URL}/attempts/bulk`;
async function syncAttempts(userId) {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, attempts: unsynced })
    });
    if (!res.ok) throw new Error(`syncAttempts failed: ${res.status}`);
    await res.json().catch(() => null);
    const updated = attempts.map(
      (a) => unsynced.some((u) => u.id === a.id) ? { ...a, synced: true } : a
    );
    setAttempts(updated);
    setSyncStatus("synced");
  } catch {
    setSyncStatus("offline");
  }
}
export {
  syncAttempts as s
};
