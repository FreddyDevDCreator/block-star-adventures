import { useEffect } from "react";
import { Mascot } from "./Mascot";
import { BigButton } from "./BigButton";
import { useConfetti } from "@/hooks/useConfetti";
import { speak } from "@/services/audio";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Coins, Sparkles, Trophy } from "lucide-react";

interface RewardModalProps {
  open: boolean;
  coins: number;
  xp: number;
  badge?: string;
  onClose: () => void;
}

export function RewardModal({ open, coins, xp, badge, onClose }: RewardModalProps) {
  const fire = useConfetti();
  const soundOn = useSettingsStore((s) => s.soundOn);

  useEffect(() => {
    if (open) {
      fire();
      if (soundOn) {
        const msg = badge
          ? `Eiii! You are a champion! You collected ${coins} coins, ${xp} experience points, and you unlocked the ${badge} badge! Well done, my friend!`
          : `Eiii! Well done! You collected ${coins} coins and ${xp} experience points! Keep going — you are doing so well!`;
        speak(msg);
      }
    }
  }, [open, fire, coins, xp, badge, soundOn]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-card rounded-3xl p-6 w-full max-w-md text-center shadow-[var(--shadow-pop)] animate-scale-in">
        <div className="flex justify-center -mt-20">
          <Mascot size="lg" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground mt-2">Awesome work!</h2>
        <p className="text-muted-foreground mt-1">You blasted through the challenge.</p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="rounded-2xl bg-[image:var(--gradient-sunshine)] p-4 text-accent-foreground">
            <Coins className="mx-auto" />
            <div className="text-2xl font-extrabold mt-1">+{coins}</div>
            <div className="text-xs font-semibold">Coins</div>
          </div>
          <div className="rounded-2xl bg-[image:var(--gradient-primary)] p-4 text-primary-foreground">
            <Sparkles className="mx-auto" />
            <div className="text-2xl font-extrabold mt-1">+{xp}</div>
            <div className="text-xs font-semibold">XP</div>
          </div>
        </div>
        {badge && (
          <div className="mt-4 inline-flex items-center gap-2 bg-success/15 text-success-foreground rounded-full px-4 py-2 font-bold">
            <Trophy className="w-4 h-4" /> Badge unlocked: {badge}
          </div>
        )}
        <BigButton className="w-full mt-6" onClick={onClose}>
          Continue
        </BigButton>
      </div>
    </div>
  );
}
