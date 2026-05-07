import mascotPng from "@/assets/mascot.png";
import { cn } from "@/lib/utils";

interface MascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  bob?: boolean;
}

const sizes = {
  sm: "w-16 h-16",
  md: "w-28 h-28",
  lg: "w-44 h-44",
  xl: "w-64 h-64",
};

export function Mascot({ size = "md", className, bob = true }: MascotProps) {
  return (
    <img
      src={mascotPng}
      alt="Bolt the friendly coding robot"
      width={768}
      height={768}
      loading="lazy"
      className={cn(
        sizes[size],
        "object-contain drop-shadow-[0_8px_20px_rgba(59,130,246,0.35)]",
        bob && "animate-[bob_3s_ease-in-out_infinite]",
        className,
      )}
      style={
        {
          // inline keyframes via tw-animate-css fallback
        }
      }
    />
  );
}
