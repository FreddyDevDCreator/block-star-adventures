import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { G as notFound } from "../_libs/tanstack__router-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-C-7bjHTk.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CodeQuest" },
      { name: "description", content: "Gamified coding adventures for kids." },
      { name: "author", content: "CodeQuest" },
      { name: "theme-color", content: "#3b82f6" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "CodeQuest" },
      { name: "twitter:title", content: "CodeQuest" },
      { property: "og:description", content: "Gamified coding adventures for kids." },
      { name: "twitter:description", content: "Gamified coding adventures for kids." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f272e686-36d6-47cf-ae9f-dccdfb27f221/id-preview-99ca6ff5--7f0f520c-58bb-423a-81df-49561f94478f.lovable.app-1777298234508.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f272e686-36d6-47cf-ae9f-dccdfb27f221/id-preview-99ca6ff5--7f0f520c-58bb-423a-81df-49561f94478f.lovable.app-1777298234508.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const $$splitComponentImporter$6 = () => import("./rewards-CYcVOnrV.mjs");
const Route$6 = createFileRoute("/rewards")({
  head: () => ({
    meta: [{
      title: "My Badges — CodeQuest"
    }, {
      name: "description",
      content: "All the badges you've collected."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./onboarding-7TDu9ldV.mjs");
const Route$5 = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{
      title: "Welcome — CodeQuest"
    }, {
      name: "description",
      content: "Meet Bolt and start your coding adventure."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const API_BASE_URL = "http://localhost:5000/api";
async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers || {}
    },
    ...options
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return await res.json();
}
function getPrimaryChallenge(lesson) {
  return lesson.challenges[0] ?? null;
}
function isGridChallenge(c) {
  return (c.type ?? "grid") === "grid";
}
function isQuizChallenge(c) {
  return (c.type ?? "grid") === "quiz";
}
async function fetchLessons() {
  return await apiFetch("/lessons");
}
async function fetchLesson(lessonId) {
  return await apiFetch(`/lessons/${encodeURIComponent(lessonId)}`);
}
const $$splitComponentImporter$4 = () => import("./journey-Cn7ib2sw.mjs");
const Route$4 = createFileRoute("/journey")({
  head: () => ({
    meta: [{
      title: "Journey — Block Star Adventures"
    }, {
      name: "description",
      content: "Choose your next coding mission."
    }]
  }),
  loader: async () => {
    return await fetchLessons();
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard-_ZOKUVdS.mjs");
const Route$3 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — CodeQuest"
    }, {
      name: "description",
      content: "Your coding adventure dashboard."
    }]
  }),
  loader: async () => {
    const lessons = await fetchLessons();
    return lessons;
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-BGCLxXn3.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Block Star Adventures — Learn coding with Bolt"
    }, {
      name: "description",
      content: "Learn coding by helping Bolt the rocket 🚀"
    }, {
      property: "og:title",
      content: "Block Star Adventures"
    }, {
      property: "og:description",
      content: "Learn coding by helping Bolt the rocket 🚀"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./play._id-C6WNeqSJ.mjs");
const Route$1 = createFileRoute("/play/$id")({
  head: () => ({
    meta: [{
      title: "Coding Challenge — CodeQuest"
    }, {
      name: "description",
      content: "Drag blocks to solve the challenge."
    }]
  }),
  loader: async ({
    params
  }) => {
    try {
      return await fetchLesson(params.id);
    } catch {
      throw notFound();
    }
  },
  validateSearch: (search) => {
    return {
      c: typeof search.c === "string" ? search.c : void 0
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitNotFoundComponentImporter = () => import("./lesson._id-DEYSz7in.mjs");
const $$splitComponentImporter = () => import("./lesson._id-Db4cTSOt.mjs");
const Route = createFileRoute("/lesson/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Lesson — CodeQuest`
    }, {
      name: "description",
      content: `Read the ${params.id} comic.`
    }]
  }),
  loader: async ({
    params
  }) => {
    try {
      return await fetchLesson(params.id);
    } catch {
      throw notFound();
    }
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const RewardsRoute = Route$6.update({
  id: "/rewards",
  path: "/rewards",
  getParentRoute: () => Route$7
});
const OnboardingRoute = Route$5.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$7
});
const JourneyRoute = Route$4.update({
  id: "/journey",
  path: "/journey",
  getParentRoute: () => Route$7
});
const DashboardRoute = Route$3.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const PlayIdRoute = Route$1.update({
  id: "/play/$id",
  path: "/play/$id",
  getParentRoute: () => Route$7
});
const LessonIdRoute = Route.update({
  id: "/lesson/$id",
  path: "/lesson/$id",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  JourneyRoute,
  OnboardingRoute,
  RewardsRoute,
  LessonIdRoute,
  PlayIdRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  API_BASE_URL as A,
  Route$4 as R,
  apiFetch as a,
  Route$3 as b,
  Route$1 as c,
  isQuizChallenge as d,
  Route as e,
  getPrimaryChallenge as g,
  isGridChallenge as i,
  router as r
};
