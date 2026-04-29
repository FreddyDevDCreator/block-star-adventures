import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/cq/LoadingScreen";
import { useAppHydration } from "@/hooks/useAppHydration";
import { Mascot } from "@/components/cq/Mascot";
import { BigButton } from "@/components/cq/BigButton";
import { SoundToggle } from "@/components/cq/SoundToggle";
import { playSfx } from "@/services/audio";
import { queueNarration } from "@/services/narrationQueue";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useUserStore } from "@/store/useUserStore";
import { PageShell } from "@/components/cq/PageShell";

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

  if (!isHydrated) return <LoadingScreen />;

  return (
    <PageShell>
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
            Learn coding with Bolt — from Africa’s sky to the Moon 🚀
          </h1>
          <p className="mt-2 text-muted-foreground font-semibold">
            A playful, offline-friendly coding adventure for African kids — built to grow
            confidence, problem-solving, and creativity.
          </p>

          <div className="mt-4 text-left rounded-2xl bg-card/50 border border-border p-4">
            <div className="font-extrabold">For parents</div>
            <ul className="mt-2 text-sm text-muted-foreground font-semibold space-y-1">
              <li>• Bite-sized missions with instant feedback (like a story game)</li>
              <li>• Progress saved automatically (works without internet)</li>
              <li>• Attempts + learning insights that show improvement over time</li>
            </ul>
          </div>

          <div className="block mt-6">
            <BigButton
              className="w-full"
              onClick={() => {
                playSfx("click");
                if (soundOn) queueNarration("Eiii! Welcome! I’m Bolt. Tap next and follow me!");
                navigate({ to: onboarded ? "/dashboard" : "/onboarding" });
              }}
            >
              Start Learning
            </BigButton>
          </div>
        </section>

        <p className="text-center text-xs text-muted-foreground font-semibold">
          Offline-first • Works without internet • Your progress saves automatically
        </p>
      </div>
    </PageShell>
  );
}
