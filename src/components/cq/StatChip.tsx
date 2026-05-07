import { cn } from "@/lib/utils";

interface StatChipProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

export function StatChip({ icon, label, value, className }: StatChipProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl bg-card border-2 border-border px-3 py-2 shadow-sm",
        className,
      )}
    >
      <span className="text-xl" aria-hidden="true">
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-xs text-muted-foreground font-medium">{label}</div>
        <div className="font-bold text-foreground">{value}</div>
      </div>
    </div>
  );
}
