import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { LoadingScreen } from "@/components/cq/LoadingScreen";
import { useAppHydration } from "@/hooks/useAppHydration";
import { Mascot } from "@/components/cq/Mascot";
import { BigButton } from "@/components/cq/BigButton";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { playSfx, speak } from "@/services/audio";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useUserStore } from "@/store/useUserStore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Block Star Adventures — Learn coding with Bolt" },
      {
        name: "description",
        content: "Learn coding by helping Bolt the rocket 🚀",
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

  useEffect(() => {
    if (!isHydrated) return;
    if (!soundOn) return;
    speak("Eiii! Let’s go on an adventure!");
  }, [isHydrated, soundOn]);

  if (!isHydrated) return <LoadingScreen />;

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-sky)] p-4 sm:p-6">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="font-extrabold text-lg">Block Star Adventures</div>
          <SoundToggle />
        </header>

        <section className="rounded-3xl bg-card border-2 border-border p-6 shadow-[var(--shadow-soft)] text-center">
          <div className="flex justify-center">
            <Mascot size="xl" />
          </div>
          <p className="mt-3 text-sm font-semibold">
            “Eiii! Let’s go on an adventure!” 🚀
          </p>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight">
            Learn coding by helping Bolt the rocket 🚀
          </h1>
          <p className="mt-2 text-muted-foreground font-semibold">
            A playful, offline-friendly coding adventure for kids — built to grow confidence,
            problem‑solving, and creativity.
          </p>

          <div className="mt-4 text-left rounded-2xl bg-card/50 border border-border p-4">
            <div className="font-extrabold">For parents</div>
            <ul className="mt-2 text-sm text-muted-foreground font-semibold space-y-1">
              <li>• Bite-sized coding missions with instant feedback</li>
              <li>• Progress saved automatically (works without internet)</li>
              <li>• Attempts + learning insights to show improvement over time</li>
            </ul>
          </div>

          <Link to={onboarded ? "/dashboard" : "/onboarding"} className="block mt-6">
            <BigButton
              className="w-full"
              onClick={() => {
                playSfx("click");
                if (soundOn) speak("Let’s go!");
              }}
            >
              Start Learning
            </BigButton>
          </Link>
        </section>

        <p className="text-center text-xs text-muted-foreground font-semibold">
          Offline-first • Works without internet • Your progress saves automatically
        </p>
      </div>
    </div>
  );
}
