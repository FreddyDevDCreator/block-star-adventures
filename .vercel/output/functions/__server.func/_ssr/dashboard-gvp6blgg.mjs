import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BigButton } from "./BigButton-DgHR4ia5.mjs";
import { P as PageShell, S as SoundToggle, c as cn } from "./PageShell--bjKwccj.mjs";
import { S as SyncStatus } from "./SyncStatus-BDHZCRjN.mjs";
import { U as UserAvatar } from "./UserAvatar-DG5E3aJ3.mjs";
import { u as useProgressStore, x as xpForNextLevel, a as xpProgress } from "./useProgressStore-C8fAoGR_.mjs";
import { u as useUserStore } from "./useUserStore-Y8Sy8XcZ.mjs";
import { b as Route$3, g as getPrimaryChallenge, q as queueNarration } from "./router-B1FQr5XI.mjs";
import "../_libs/idb.mjs";
import { e as Coins, S as Sparkles, T as Trophy, f as Map, A as Award, b as Star, g as Timer, R as Rocket, B as BookOpen, P as Play } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/zustand.mjs";
function StatChip({ icon, label, value, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-2 rounded-2xl bg-card border-2 border-border px-3 py-2 shadow-sm",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground", children: value })
        ] })
      ]
    }
  );
}
function ProgressBar({ value, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-3 rounded-full bg-secondary overflow-hidden", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-full bg-[image:var(--gradient-primary)] transition-all duration-500",
      style: { width: `${Math.max(0, Math.min(1, value)) * 100}%` }
    }
  ) });
}
function StatsCard({ label, value, icon, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-3xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-semibold", children: label }),
          icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg", children: icon }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-extrabold text-foreground", children: value })
      ]
    }
  );
}
function getAttemptsForChallenge(attempts, challengeId) {
  return attempts.filter((a) => a.challengeId === challengeId);
}
function getSuccessRate(attempts, challengeId) {
  const list = getAttemptsForChallenge(attempts, challengeId);
  if (list.length === 0) return 0;
  const success = list.filter((a) => a.success).length;
  return success / list.length;
}
function getAverageTime(attempts, challengeId) {
  const list = getAttemptsForChallenge(attempts, challengeId);
  if (list.length === 0) return 0;
  const recent = list.slice(-5);
  const total = recent.reduce((sum, a) => sum + a.timeTaken, 0);
  return total / recent.length;
}
function getEfficiency(attempts, challengeId) {
  const list = getAttemptsForChallenge(attempts, challengeId);
  if (list.length === 0) return 0;
  const recent = list.slice(-5);
  const totalMoves = recent.reduce((sum, a) => sum + a.movesUsed, 0);
  return totalMoves / recent.length;
}
function getLearningStatus(successRate) {
  if (successRate === 1) return "Mastered 🚀";
  if (successRate >= 0.7) return "Getting Good 👍";
  if (successRate >= 0.4) return "Keep Trying 💪";
  return "Needs Help 🧠";
}
function getImprovementHint(attempts, challengeId) {
  const list = attempts.filter((a) => a.challengeId === challengeId);
  const last3 = list.slice(-3);
  if (last3.length < 2) return "Keep going!";
  const first = last3[0];
  const last = last3[last3.length - 1];
  if (last.timeTaken < first.timeTaken) {
    return "You are getting faster! ⚡";
  }
  if (last.success && !first.success) {
    return "Nice! You figured it out 🎉";
  }
  return "Try again, you can do better 💪";
}
function Dashboard() {
  const navigate = useNavigate();
  const {
    coins,
    xp,
    level,
    badges,
    completedScenes
  } = useProgressStore();
  const attempts = useProgressStore((s) => s.attempts);
  const name = useUserStore((s) => s.name);
  const avatar = useUserStore((s) => s.avatar);
  const safeName = name?.trim() && name.trim() !== "Explorer" ? name.trim() : "Explorer";
  const lessons = Route$3.useLoaderData();
  const fallbackLesson = lessons[0];
  const progress = xpProgress(xp);
  const lastAttempt = attempts.length ? attempts[attempts.length - 1] : null;
  const fallbackPrimary = fallbackLesson ? getPrimaryChallenge(fallbackLesson) : null;
  const challengeId = lastAttempt?.challengeId ?? fallbackPrimary?.id ?? "";
  const currentLesson = lessons.find((l) => (l.challenges ?? []).some((ch) => ch.id === challengeId)) ?? fallbackLesson;
  const currentChallenge = currentLesson?.challenges.find((ch) => ch.id === challengeId) ?? (currentLesson ? getPrimaryChallenge(currentLesson) : null);
  const scenesTotal = currentChallenge?.scenes?.length ?? 0;
  const scenesDone = currentLesson && currentChallenge ? completedScenes.filter((k) => k.startsWith(`${currentLesson.id}:${currentChallenge.id}:`)).length : 0;
  const successRate = getSuccessRate(attempts, challengeId);
  const avgTimeMs = getAverageTime(attempts, challengeId);
  const efficiency = getEfficiency(attempts, challengeId);
  const attemptsCount = getAttemptsForChallenge(attempts, challengeId).length;
  const status = getLearningStatus(successRate);
  const hint = getImprovementHint(attempts, challengeId);
  const pct = Math.round(successRate * 100);
  const seconds = Math.round(avgTimeMs / 1e3);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-semibold", children: "Welcome back!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-extrabold", children: [
          "Hey, ",
          safeName,
          " 👋"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { avatarId: avatar })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-semibold", children: "LEVEL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-extrabold text-primary", children: level })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-semibold", children: "NEXT LEVEL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold", children: [
            xpForNextLevel(xp),
            " XP"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: progress, className: "mt-3" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-5 h-5 text-amber-500" }), label: "Coins", value: coins }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }), label: "XP", value: xp }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-success" }), label: "Badges", value: badges.length })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/journey", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { className: "w-full", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "w-5 h-5" }), children: "Journey Map" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rewards", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { variant: "accent", className: "w-full", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5" }), children: "My Badges" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-extrabold text-lg", children: "My Learning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-500" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { label: "Success", value: `${pct}%`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { label: "Speed", value: `${seconds}s`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { label: "Moves", value: `${efficiency.toFixed(1)}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-5 h-5 text-success" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { label: "Attempts", value: `${attemptsCount}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-extrabold", children: status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-semibold", children: hint })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-extrabold text-lg", children: "Today's Adventure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: currentLesson?.title ?? "No lessons yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: currentLesson?.summary ?? "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-muted-foreground", children: currentLesson ? `${scenesDone}/${scenesTotal} scenes` : "" }),
      currentLesson && currentChallenge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { className: "w-full", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }), onClick: () => {
        queueNarration("Welcome back! Let’s continue your next mission.");
        navigate({
          to: "/lesson/$id",
          params: {
            id: currentLesson.id
          },
          search: {
            c: currentChallenge.id
          }
        });
      }, children: "Continue Learning" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-extrabold mb-2", children: "Explore Lessons" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: lessons.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/lesson/$id", params: {
        id: l.id
      }, className: "flex items-center gap-3 rounded-2xl bg-card border-2 border-border p-3 hover:border-primary transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-[image:var(--gradient-primary)] grid place-items-center text-2xl", children: "🚀" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: l.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: l.summary })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary" })
      ] }) }, l.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SyncStatus, {})
  ] }) });
}
export {
  Dashboard as component
};
