import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mascot } from "@/components/cq/Mascot";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { BigButton } from "@/components/cq/BigButton";
import { ONBOARDING_STEPS } from "@/features/onboarding/steps";
import { useGameStore } from "@/store/useGameStore";
import { playNarration } from "@/services/audio";
import { ChevronRight, SkipForward } from "lucide-react";

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
  const [step, setStep] = useState(0);
  const finishOnboarding = useGameStore((s) => s.finishOnboarding);
  const navigate = useNavigate();
  const current = ONBOARDING_STEPS[step];

  const finish = () => {
    finishOnboarding();
    navigate({ to: "/dashboard" });
  };

  const next = () => {
    if (step >= ONBOARDING_STEPS.length - 1) return finish();
    const nextStep = step + 1;
    setStep(nextStep);
    playNarration(ONBOARDING_STEPS[nextStep].message);
  };

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">
        <Mascot size="xl" />
        <SpeechBubble arrow="bottom" className="w-full">
          <div className="text-3xl mb-1">{current.emoji}</div>
          <h1 className="text-2xl font-extrabold">{current.title}</h1>
          <p className="text-muted-foreground mt-1">{current.message}</p>
        </SpeechBubble>

        <div className="flex gap-2">
          {ONBOARDING_STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3 w-full">
          <BigButton variant="ghost" className="flex-1" onClick={finish} icon={<SkipForward className="w-5 h-5" />}>
            Skip
          </BigButton>
          <BigButton className="flex-[2]" onClick={next} icon={<ChevronRight className="w-5 h-5" />}>
            {step === ONBOARDING_STEPS.length - 1 ? "Let's go!" : "Next"}
          </BigButton>
        </div>
      </div>
    </div>
  );
}
