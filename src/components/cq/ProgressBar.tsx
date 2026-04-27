import { cn } from "@/lib/utils";

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-3 rounded-full bg-secondary overflow-hidden", className)}>
      <div
        className="h-full bg-[image:var(--gradient-primary)] transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </div>
  );
}
