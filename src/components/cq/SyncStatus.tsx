import { useProgressStore } from "@/store/useProgressStore";

export function SyncStatus() {
  const status = useProgressStore((s) => s.syncStatus);

  if (!status || status === "idle") return null;

  const labelMap: Record<Exclude<typeof status, "idle">, string> = {
    syncing: "Saving...",
    synced: "All progress saved ✅",
    offline: "Offline — will sync later",
  };

  return (
    <div className="text-xs text-center mt-2 opacity-70">
      {labelMap[status as Exclude<typeof status, "idle">]}
    </div>
  );
}

