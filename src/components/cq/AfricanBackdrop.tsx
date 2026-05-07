import { cn } from "@/lib/utils";

export function AfricanBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 opacity-25", className)}
    >
      {/* Kente-inspired stripes + subtle geometric dots.
          Pure CSS/SVG so it works everywhere without extra assets. */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.65_0.17_240/0.65),oklch(0.78_0.14_200/0.35))]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,oklch(0.65_0.17_240/0.35)_0px,oklch(0.65_0.17_240/0.35)_10px,transparent_10px,transparent_22px)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
      >
        {/* Triangle motifs */}
        {Array.from({ length: 18 }).map((_, i) => (
          <polygon
            key={`triangle-${i}`}
            points={`${(i % 6) * 70 + 10},${i * 45 - 20} ${(i % 6) * 70 + 40},${i * 45 - 40} ${(i % 6) * 70 + 70},${
              i * 45 - 20
            }`}
            fill="oklch(0.85 0.17 90 / 0.25)"
          />
        ))}
      </svg>
    </div>
  );
}
