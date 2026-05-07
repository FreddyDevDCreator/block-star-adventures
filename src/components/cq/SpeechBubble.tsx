import { cn } from "@/lib/utils";
import { useSpeak } from "@/hooks/useSpeak";

interface SpeechBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  arrow?: "left" | "bottom" | "none";
  /** When true, speaks `speakText` (never auto-reads children). */
  speak?: boolean;
  /** Explicit narration text (prevents robotic “screen reading”). */
  speakText?: string;
}

export function SpeechBubble({
  children,
  className,
  arrow = "left",
  speak = false,
  speakText,
  ...rest
}: SpeechBubbleProps) {
  useSpeak(speakText ?? "", speak);

  return (
    <div
      {...rest}
      className={cn(
        "relative rounded-3xl bg-card text-card-foreground px-5 py-4 shadow-[var(--shadow-soft)] border-2 border-primary/20 animate-fade-in",
        className,
      )}
    >
      {children}
      {arrow === "left" && (
        <span className="absolute -left-3 top-6 w-6 h-6 rotate-45 bg-card border-l-2 border-b-2 border-primary/20 pointer-events-none" />
      )}
      {arrow === "bottom" && (
        <span className="absolute left-8 -bottom-3 w-6 h-6 rotate-45 bg-card border-r-2 border-b-2 border-primary/20 pointer-events-none" />
      )}
    </div>
  );
}
