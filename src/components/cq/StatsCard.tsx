import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ label, value, icon, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground font-semibold">{label}</div>
        {icon ? <div className="text-lg">{icon}</div> : null}
      </div>
      <div className="mt-1 text-2xl font-extrabold text-foreground">{value}</div>
    </div>
  );
}

