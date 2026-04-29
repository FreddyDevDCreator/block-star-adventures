import { cn } from "@/lib/utils";
import { AfricanBackdrop } from "@/components/cq/AfricanBackdrop";
import type React from "react";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-dvh relative flex flex-col overflow-y-auto",
        // Keep the page scrollable even on small phones.
        "bg-[image:var(--gradient-sky)]",
        "p-4 sm:p-6 pb-[env(safe-area-inset-bottom)]",
        className,
      )}
    >
      <AfricanBackdrop />
      <div className="relative flex-1 w-full">{children}</div>
    </div>
  );
}

