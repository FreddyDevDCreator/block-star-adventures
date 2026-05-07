import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/cq/LoadingScreen";
import { useAppHydration } from "@/hooks/useAppHydration";
import { Mascot } from "@/components/cq/Mascot";
import { BigButton } from "@/components/cq/BigButton";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { playSfx, unlockAudio } from "@/services/audio";
import { queueNarration } from "@/services/narrationQueue";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useUserStore } from "@/store/useUserStore";
import { PageShell } from "@/components/cq/PageShell";
import { SpeechBubble } from "@/components/cq/SpeechBubble";
import { StatChip } from "@/components/cq/StatChip";
import { useConfetti } from "@/hooks/useConfetti";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock3, Rocket, Sparkles, WifiOff } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Block Star Adventures — Learn coding with Bolt" },
      {
        name: "description",
        content: "Learn coding with Bolt — from Africa’s sky to the Moon 🚀",
      },
      { property: "og:title", content: "Block Star Adventures" },
      { property: "og:description", content: "Learn coding by helping Bolt the rocket 🚀" },
    ],
  }),
  component: Index,
});

function Index() {
  const isHydrated = useAppHydration();
  const soundOn = useSettingsStore((s) => s.soundOn);
  const onboarded = useUserStore((s) => s.onboarded);
  const navigate = useNavigate();
  const confetti = useConfetti();
  const [isStarting, setIsStarting] = useState(false);

  const primaryCtaLabel = useMemo(
    () => (onboarded ? "Continue Adventure" : "Start Learning"),
    [onboarded],
  );

  const handleStart = useCallback(() => {
    if (isStarting) return;
    setIsStarting(true);

    void unlockAudio();
    playSfx("click");
    confetti();

    if (soundOn) {
      queueNarration("Eiii! Welcome! I’m Bolt. Tap next and follow me!");
    }

    navigate({ to: onboarded ? "/dashboard" : "/onboarding" });
  }, [confetti, isStarting, navigate, onboarded, soundOn]);

  if (!isHydrated) return <LoadingScreen />;

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-xl flex flex-col gap-5 sm:gap-6">
        <header className="flex items-center justify-between gap-3 min-w-0">
          <div className="font-extrabold text-base sm:text-lg leading-tight">
            Block Star Adventures
          </div>
          <SoundToggle className="w-11 h-11" />
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-5 sm:p-6 shadow-[var(--shadow-soft)]">
          <div className="grid gap-4">
            <div className="grid justify-items-center">
              <Mascot size="lg" className="sm:w-64 sm:h-64" />
              <div className="mt-2 w-full max-w-sm">
                <SpeechBubble arrow="bottom">
                  <p className="text-center font-extrabold text-base sm:text-lg">
                    Hi! I’m Bolt — tap the big button to start!
                  </p>
                </SpeechBubble>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Learn coding with Bolt <span aria-hidden="true">🚀</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground font-semibold">
                Short missions • Instant feedback • Big rewards
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatChip icon={<Clock3 className="w-5 h-5" />} label="Missions" value="3–5 min" />
              <StatChip
                icon={<WifiOff className="w-5 h-5" />}
                label="Offline"
                value="Works without internet"
              />
              <StatChip
                icon={<Sparkles className="w-5 h-5" />}
                label="Rewards"
                value="Stars + confetti"
              />
            </div>

            <div className="grid gap-3">
              <BigButton
                className="w-full"
                icon={<Rocket className="w-5 h-5" aria-hidden="true" />}
                disabled={isStarting}
                aria-busy={isStarting}
                onClick={handleStart}
              >
                {isStarting ? "Starting…" : primaryCtaLabel}
              </BigButton>

              <p className="text-center text-xs sm:text-sm text-muted-foreground font-semibold">
                Offline-first • Saves automatically • Kid-friendly design
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="grownups" className="border-0">
                <AccordionTrigger className="rounded-2xl bg-card border-2 border-border px-4 hover:no-underline">
                  Grown-ups: what this teaches
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-3">
                  <ul className="text-sm sm:text-base text-muted-foreground font-semibold space-y-2 list-disc pl-5">
                    <li>Bite-sized missions with instant feedback (like a story game)</li>
                    <li>Progress saves automatically (even without internet)</li>
                    <li>Attempts + learning insights that show improvement over time</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
