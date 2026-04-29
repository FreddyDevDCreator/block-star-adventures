// Small mute/unmute button for headers.
// Reads soundOn and toggleSound from useSettingsStore
// (Step 2 of architecture refactor — decoupled from game/progress state).
import { Volume2, VolumeX } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { stopNarration } from "@/services/audio";
import { cn } from "@/lib/utils";

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className }: SoundToggleProps) {
  const soundOn = useSettingsStore((s) => s.soundOn);
  const toggleSound = useSettingsStore((s) => s.toggleSound);

  const handleClick = () => {
    if (soundOn) void stopNarration();
    toggleSound();
  };

  return (
    <button
      id="sound-toggle"
      onClick={handleClick}
      aria-label={soundOn ? "Mute sound" : "Unmute sound"}
      title={soundOn ? "Mute" : "Unmute"}
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-full",
        "bg-card border-2 border-border shadow-[var(--shadow-soft)]",
        "hover:border-primary transition-colors",
        soundOn ? "text-primary" : "text-muted-foreground",
        className,
      )}
    >
      {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
