// Small mute/unmute button for headers. Reads soundOn from the global store
// and calls toggleSound on click.
import { Volume2, VolumeX } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { stopSpeaking } from "@/services/audio";
import { cn } from "@/lib/utils";

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className }: SoundToggleProps) {
  const soundOn = useGameStore((s) => s.soundOn);
  const toggleSound = useGameStore((s) => s.toggleSound);

  const handleClick = () => {
    if (soundOn) stopSpeaking();
    toggleSound();
  };

  return (
    <button
      id="sound-toggle"
      onClick={handleClick}
      aria-label={soundOn ? "Mute sound" : "Unmute sound"}
      title={soundOn ? "Mute" : "Unmute"}
      className={cn(
        "inline-flex items-center justify-center w-9 h-9 rounded-full",
        "bg-card border-2 border-border shadow-[var(--shadow-soft)]",
        "hover:border-primary transition-colors",
        soundOn ? "text-primary" : "text-muted-foreground",
        className,
      )}
    >
      {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
}
