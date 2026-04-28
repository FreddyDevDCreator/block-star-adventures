import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mascot } from "@/components/cq/Mascot";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { BigButton } from "@/components/cq/BigButton";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { ONBOARDING_STEPS } from "@/features/onboarding/steps";
import { useUserStore } from "@/store/useUserStore";
import { createUser } from "@/services/users";
import { ChevronRight, SkipForward } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — CodeQuest" },
      { name: "description", content: "Meet Bolt and start your coding adventure." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const { name, avatar, ageGroup } = useUserStore();
  const setName = useUserStore((s) => s.setName);
  const [step, setStep] = useState(0);
  const finishOnboarding = useUserStore((s) => s.finishOnboarding);
  const setUserId = useUserStore((s) => s.setUserId);
  const userId = useUserStore((s) => s.userId);
  const navigate = useNavigate();
  const current = ONBOARDING_STEPS[step];

  // Speak the first step on mount
  useEffect(() => {
    // Trigger speech — SpeechBubble speak prop handles subsequent changes
  }, []);

  const finish = async () => {
    if (!userId) {
      try {
        const res = await createUser({ name, avatar, ageGroup });
        setUserId(res.userId);
      } catch {
        // Offline / backend not running yet — keep local profile; sync will wait until userId exists.
      }
    }
    finishOnboarding();
    navigate({ to: "/dashboard" });
  };

  const next = () => {
    if (step >= ONBOARDING_STEPS.length - 1) return finish();
    setStep(step + 1);
  };

  const needsName = !name || name.trim() === "" || name === "Explorer";

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] flex flex-col items-center justify-center p-6">
      {/* Sound toggle — top-right corner */}
      <div className="absolute top-4 right-4">
        <SoundToggle />
      </div>

      <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">
        <Mascot size="xl" />
        {needsName ? (
          <SpeechBubble arrow="bottom" className="w-full" speak>
            <div className="text-3xl mb-1">👋</div>
            <h1 className="text-2xl font-extrabold">What’s your name?</h1>
            <p className="text-muted-foreground mt-1">
              So Bolt can call you by your name.
            </p>
            <div className="mt-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name…"
                className="text-center font-bold"
              />
            </div>
          </SpeechBubble>
        ) : (
          <SpeechBubble arrow="bottom" className="w-full" speak>
            <div className="text-3xl mb-1">{current.emoji}</div>
            <h1 className="text-2xl font-extrabold">{current.title}</h1>
            <p className="text-muted-foreground mt-1">{current.message}</p>
          </SpeechBubble>
        )}

        <div className="flex gap-2">
          {needsName ? (
            <span className="h-2 w-8 rounded-full bg-primary" />
          ) : (
            ONBOARDING_STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))
          )}
        </div>

        <div className="flex gap-3 w-full">
          <BigButton
            variant="ghost"
            className="flex-1"
            onClick={finish}
            icon={<SkipForward className="w-5 h-5" />}
          >
            Skip
          </BigButton>
          <BigButton
            className="flex-[2]"
            onClick={needsName ? () => setName(name.trim() || "Explorer") : next}
            icon={<ChevronRight className="w-5 h-5" />}
            disabled={needsName && name.trim().length < 2}
          >
            {needsName ? "Continue" : step === ONBOARDING_STEPS.length - 1 ? "Let's go!" : "Next"}
          </BigButton>
        </div>
      </div>
    </div>
  );
}
