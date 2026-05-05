import { ArrowLeftRight } from "lucide-react";

function Cup({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs font-extrabold text-muted-foreground">{label}</div>
      <div className="mt-1 w-14 h-14 rounded-2xl border-2 border-border bg-card grid place-items-center text-xl shadow-sm">
        {value}
      </div>
    </div>
  );
}

export function SwapCupsExplainer() {
  return (
    <div className="mt-2 rounded-2xl border-2 border-border bg-card/60 p-3">
      <div className="flex items-center justify-between">
        <div className="font-extrabold text-sm">Swap using a helper cup</div>
        <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <Cup label="Cup A" value="🥤" />
        <Cup label="Cup B" value="🧃" />
        <Cup label="Cup C (helper)" value="☕" />
      </div>

      <ol className="mt-3 text-xs font-semibold text-muted-foreground list-decimal pl-4 space-y-1">
        <li>Pour A into C (store it safely).</li>
        <li>Pour B into A.</li>
        <li>Pour C into B.</li>
      </ol>
    </div>
  );
}

