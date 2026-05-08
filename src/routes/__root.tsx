import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { consumeQueuedNarration } from "@/services/narrationQueue";
import { narrate } from "@/services/audio";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Block Star Adventures" },
      { name: "description", content: "Learn coding with Bolt — from Africa’s sky to the Moon." },
      { name: "author", content: "Block Star Adventures" },
      { name: "theme-color", content: "#3b82f6" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Block Star Adventures" },
      { name: "twitter:title", content: "Block Star Adventures" },
      {
        property: "og:description",
        content: "Learn coding with Bolt — from Africa’s sky to the Moon.",
      },
      {
        name: "twitter:description",
        content: "Learn coding with Bolt — from Africa’s sky to the Moon.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f272e686-36d6-47cf-ae9f-dccdfb27f221/id-preview-99ca6ff5--7f0f520c-58bb-423a-81df-49561f94478f.lovable.app-1777298234508.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f272e686-36d6-47cf-ae9f-dccdfb27f221/id-preview-99ca6ff5--7f0f520c-58bb-423a-81df-49561f94478f.lovable.app-1777298234508.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const locationKey = useRouterState({ select: (s) => s.location.href });
  const soundOn = useSettingsStore((s) => s.soundOn);

  useEffect(() => {
    if (!soundOn) return;
    const queued = consumeQueuedNarration();
    if (!queued) return;
    void narrate(queued);
  }, [locationKey, soundOn]);

  return <Outlet />;
}
