import { cn } from "@/lib/utils";
import { useSpeak } from "@/hooks/useSpeak";

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  arrow?: "left" | "bottom" | "none";
  /** When true, the bubble's text content is spoken aloud via Web Speech. */
  speak?: boolean;
}

function childrenToString(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToString).join(" ");
  if (children !== null && typeof children === "object" && "props" in (children as object)) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return childrenToString(el.props.children);
  }
  return "";
}

export function SpeechBubble({ children, className, arrow = "left", speak = false }: SpeechBubbleProps) {
  const text = speak ? childrenToString(children) : "";
  useSpeak(text, speak);

  return (
    <div
      className={cn(
        "relative rounded-3xl bg-card text-card-foreground px-5 py-4 shadow-[var(--shadow-soft)] border-2 border-primary/20 animate-fade-in",
        className,
      )}
    >
      {children}
      {arrow === "left" && (
        <span className="absolute -left-3 top-6 w-6 h-6 rotate-45 bg-card border-l-2 border-b-2 border-primary/20" />
      )}
      {arrow === "bottom" && (
        <span className="absolute left-8 -bottom-3 w-6 h-6 rotate-45 bg-card border-r-2 border-b-2 border-primary/20" />
      )}
    </div>
  );
}
