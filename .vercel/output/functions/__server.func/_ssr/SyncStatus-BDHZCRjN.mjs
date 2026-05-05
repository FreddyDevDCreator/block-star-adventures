import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useProgressStore } from "./useProgressStore-C8fAoGR_.mjs";
function SyncStatus() {
  const status = useProgressStore((s) => s.syncStatus);
  if (!status || status === "idle") return null;
  const labelMap = {
    syncing: "Saving...",
    synced: "All progress saved ✅",
    offline: "Offline — will sync later"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-center mt-2 opacity-70", children: labelMap[status] });
}
export {
  SyncStatus as S
};
