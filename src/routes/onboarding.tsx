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
import { PageShell } from "@/components/cq/PageShell";
import { playSfx, unlockAudio } from "@/services/audio";

const AVATARS: Array<{ id: string; label: string; emoji: string }> = [
  { id: "rocket", label: "Rocket", emoji: "🚀" },
  { id: "star", label: "Star", emoji: "⭐" },
  { id: "lion", label: "Lion", emoji: "🦁" },
  { id: "drum", label: "Drum", emoji: "🥁" },
  { id: "book", label: "Book", emoji: "📘" },
  { id: "ball", label: "Ball", emoji: "⚽" },
];

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — Block Star Adventures" },
      { name: "description", content: "Meet Bolt and start your coding adventure." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const { name, avatar, ageGroup } = useUserStore();
  const setName = useUserStore((s) => s.setName);
  const setAvatar = useUserStore((s) => s.setAvatar);
  const setAgeGroup = useUserStore((s) => s.setAgeGroup);
  const [step, setStep] = useState(0);
  const finishOnboarding = useUserStore((s) => s.finishOnboarding);
  const setUserId = useUserStore((s) => s.setUserId);
  const userId = useUserStore((s) => s.userId);
  const navigate = useNavigate();

  const setupSteps = 3; // name, avatar, age
  const storyIndex = step - setupSteps;
  const inStory = storyIndex >= 0;
  const current = inStory ? ONBOARDING_STEPS[storyIndex] : null;
  const totalSteps = setupSteps + ONBOARDING_STEPS.length;

  // Speak the first step on mount
  useEffect(() => {
    // Trigger speech — SpeechBubble speak prop handles subsequent changes
  }, []);

  const finish = async () => {
    finishOnboarding();
    navigate({ to: "/dashboard" });

    // Create backend user in background (never block navigation/UX).
    if (!userId) {
      try {
        const res = await createUser({ name, avatar, ageGroup });
        setUserId(res.userId);
      } catch {
        // Offline / backend not running yet — keep local profile; sync will wait until userId exists.
      }
    }
  };

  const next = () => {
    if (step >= totalSteps - 1) return finish();
    setStep(step + 1);
  };

  const isNameStep = step === 0;
  const isAvatarStep = step === 1;
  const isAgeStep = step === 2;
  const nameTrimmed = name.trim();
  const nameIsValid = Boolean(nameTrimmed.length >= 2 && nameTrimmed !== "Explorer");
  const avatarIsValid = Boolean(avatar && avatar.trim().length > 0);
  const ageIsValid = ageGroup === "kid" || ageGroup === "teen";

  return (
    <PageShell className="items-center">
      {/* Sound toggle — top-right corner */}
      <div className="absolute top-4 right-4">
        <SoundToggle />
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">
        <Mascot size="xl" />
          {isNameStep ? (
            <SpeechBubble arrow="bottom" className="w-full">
              <div className="text-3xl mb-1">👋</div>
              <h1 className="text-2xl font-extrabold">What’s your name, hero?</h1>
              <p className="text-muted-foreground mt-1">
                So Bolt can call you in his rocket crew.
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
          ) : isAvatarStep ? (
            <SpeechBubble arrow="bottom" className="w-full">
              <div className="text-3xl mb-1">🎭</div>
              <h1 className="text-2xl font-extrabold">Pick your avatar</h1>
              <p className="text-muted-foreground mt-1">
                Choose a badge for your crew card.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {AVATARS.map((a) => {
                  const active = avatar === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAvatar(a.id)}
                      className={[
                        "rounded-2xl border-2 p-3 min-h-14 font-extrabold transition-colors",
                        "bg-card",
                        active ? "border-primary bg-primary/10" : "border-border hover:border-primary/60",
                      ].join(" ")}
                    >
                      <div className="text-2xl">{a.emoji}</div>
                      <div className="mt-1 text-xs text-muted-foreground font-bold">{a.label}</div>
                    </button>
                  );
                })}
              </div>
            </SpeechBubble>
          ) : isAgeStep ? (
            <SpeechBubble arrow="bottom" className="w-full">
              <div className="text-3xl mb-1">🎒</div>
              <h1 className="text-2xl font-extrabold">How old are you?</h1>
              <p className="text-muted-foreground mt-1">
                This helps us pick the right level of hints.
              </p>
              <div className="mt-4 grid gap-2">
                <button
                  onClick={() => setAgeGroup("kid")}
                  className={[
                    "rounded-2xl border-2 px-5 py-4 min-h-14 font-extrabold text-left transition-colors",
                    ageGroup === "kid" ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60",
                  ].join(" ")}
                >
                  <div className="text-base">6–11 years</div>
                  <div className="text-xs text-muted-foreground font-bold">Kid</div>
                </button>
                <button
                  onClick={() => setAgeGroup("teen")}
                  className={[
                    "rounded-2xl border-2 px-5 py-4 min-h-14 font-extrabold text-left transition-colors",
                    ageGroup === "teen" ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60",
                  ].join(" ")}
                >
                  <div className="text-base">12–16 years</div>
                  <div className="text-xs text-muted-foreground font-bold">Teen</div>
                </button>
              </div>
            </SpeechBubble>
          ) : (
            <SpeechBubble arrow="bottom" className="w-full">
              <div className="text-3xl mb-1">{current?.emoji}</div>
              <h1 className="text-2xl font-extrabold">{current?.title}</h1>
              <p className="text-muted-foreground mt-1">
                {(current?.message ?? "")
                  .replaceAll("{name}", nameTrimmed || "Explorer")
                  .replaceAll("{hero}", nameTrimmed || "Explorer")}
              </p>
        </SpeechBubble>
          )}

        <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
            <span
                key={idx}
              className={`h-2 rounded-full transition-all ${
                  idx === step ? "w-8 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3 w-full">
            <BigButton
              variant="ghost"
              className="flex-1"
              onClick={() => {
                void unlockAudio();
                playSfx("click");
                void finish();
              }}
              icon={<SkipForward className="w-5 h-5" />}
            >
            Skip
          </BigButton>
            <BigButton
              className="flex-[2]"
              onClick={
                isNameStep
                  ? () => {
                      void unlockAudio();
                      playSfx("click");
                      setName(nameTrimmed || "Explorer");
                      next();
                    }
                  : () => {
                      void unlockAudio();
                      playSfx("click");
                      next();
                    }
              }
              icon={<ChevronRight className="w-5 h-5" />}
              disabled={
                (isNameStep && !nameIsValid) ||
                (isAvatarStep && !avatarIsValid) ||
                (isAgeStep && !ageIsValid)
              }
            >
              {isNameStep
                ? "Continue"
                : step === totalSteps - 1
                  ? "Let's go!"
                  : "Next"}
          </BigButton>
        </div>
      </div>
    </div>
    </PageShell>
  );
}
