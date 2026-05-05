import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as Route$1, g as getPrimaryChallenge, i as isGridChallenge, e as isQuizChallenge, p as playSfx, n as narrate, f as fetchLessons, h as getNextLevel, q as queueNarration, c as useSettingsStore } from "./router-B1FQr5XI.mjs";
import { B as BigButton } from "./BigButton-DgHR4ia5.mjs";
import { M as Mascot } from "./Mascot-DbVLG9gg.mjs";
import { S as SpeechBubble } from "./SpeechBubble-B-LGQzxw.mjs";
import { P as PageShell, S as SoundToggle, c as cn } from "./PageShell--bjKwccj.mjs";
import { c as confetti } from "../_libs/canvas-confetti.mjs";
import { u as useProgressStore } from "./useProgressStore-C8fAoGR_.mjs";
import { s as syncAttempts } from "./sync-lczgUlDs.mjs";
import { u as useUserStore } from "./useUserStore-Y8Sy8XcZ.mjs";
import { S as SyncStatus } from "./SyncStatus-BDHZCRjN.mjs";
import { I as Input } from "./input-D6dSch3s.mjs";
import "../_libs/idb.mjs";
import { H as House, h as Lightbulb, i as RotateCcw, P as Play, j as ArrowLeftRight, e as Coins, S as Sparkles, T as Trophy } from "../_libs/lucide-react.mjs";
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
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const STEP_MS = 250;
function GridSim({ size = 4, trail, goal, animating = false, onAnimationEnd }) {
  const [visibleUpTo, setVisibleUpTo] = reactExports.useState(trail.length);
  const intervalRef = reactExports.useRef(null);
  const onAnimationEndRef = reactExports.useRef(onAnimationEnd);
  onAnimationEndRef.current = onAnimationEnd;
  reactExports.useEffect(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animating && trail.length > 1) {
      setVisibleUpTo(1);
      let current = 1;
      intervalRef.current = setInterval(() => {
        current += 1;
        setVisibleUpTo(current);
        if (current >= trail.length) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          onAnimationEndRef.current?.();
        }
      }, STEP_MS);
    } else {
      setVisibleUpTo(trail.length);
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [trail, animating]);
  const visibleTrail = trail.slice(0, visibleUpTo);
  const rocketPos = visibleTrail[visibleTrail.length - 1];
  const cells = Array.from({ length: size * size }, (_, i) => {
    const x = i % size;
    const y = size - 1 - Math.floor(i / size);
    const isGoal = x === goal.x && y === goal.y;
    const inTrail = visibleTrail.some((s) => s.x === x && s.y === y);
    const isRocket = rocketPos && rocketPos.x === x && rocketPos.y === y;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: [
          "aspect-square rounded-lg border-2 border-border flex items-center justify-center text-2xl transition-all duration-200",
          inTrail ? "bg-primary/15" : "bg-card",
          isGoal ? "bg-accent/30 border-accent" : "",
          isRocket ? "scale-110" : ""
        ].join(" "),
        children: isRocket ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: animating ? "animate-[bob_0.5s_ease-in-out_infinite]" : "", children: "🚀" }) : isGoal ? "🌙" : ""
      },
      i
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid gap-2 p-3 rounded-2xl bg-[image:var(--gradient-sky)] border-2 border-border",
      style: { gridTemplateColumns: `repeat(${size}, 1fr)` },
      children: cells
    }
  );
}
const MAX_STEPS = 200;
function simulate(code, start) {
  const trail = [{ ...start }];
  const pos = { ...start };
  let steps = 0;
  const guard = () => {
    if (++steps > MAX_STEPS) throw new Error("Too many moves — try a smaller program.");
  };
  const api = {
    moveRight: () => {
      guard();
      pos.x += 1;
      trail.push({ ...pos });
    },
    moveLeft: () => {
      guard();
      pos.x -= 1;
      trail.push({ ...pos });
    },
    moveUp: () => {
      guard();
      pos.y += 1;
      trail.push({ ...pos });
    },
    moveDown: () => {
      guard();
      pos.y -= 1;
      trail.push({ ...pos });
    }
  };
  try {
    const fn = new Function("api", `with(api){
${code}
}`);
    fn(api);
  } catch (err) {
    return { trail, finalPos: pos, error: err.message };
  }
  return { trail, finalPos: pos };
}
function useConfetti() {
  return () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#fbbf24", "#34d399", "#f472b6"]
    });
  };
}
function RewardModal({ open, coins, xp, badge, onClose }) {
  const fire = useConfetti();
  const soundOn = useSettingsStore((s) => s.soundOn);
  reactExports.useEffect(() => {
    if (open) {
      fire();
      if (soundOn) {
        const msg = badge ? `Eiii! You are a champion! You collected ${coins} coins, ${xp} experience points, and you unlocked the ${badge} badge! Well done, my friend!` : `Eiii! Well done! You collected ${coins} coins and ${xp} experience points! Keep going — you are doing so well!`;
        void narrate(msg);
      }
    }
  }, [open, fire, coins, xp, badge, soundOn]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 grid place-items-center bg-foreground/40 backdrop-blur-sm p-4 animate-fade-in",
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl p-6 w-full max-w-md text-center shadow-[var(--shadow-pop)] animate-scale-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center -mt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold text-foreground mt-2", children: "Awesome work!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "You blasted through the challenge." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[image:var(--gradient-sunshine)] p-4 text-accent-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-extrabold mt-1", children: [
              "+",
              coins
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: "Coins" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[image:var(--gradient-primary)] p-4 text-primary-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-extrabold mt-1", children: [
              "+",
              xp
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: "XP" })
          ] })
        ] }),
        badge && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-2 bg-success/15 text-success-foreground rounded-full px-4 py-2 font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }),
          " Badge unlocked: ",
          badge
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { className: "w-full mt-6", onClick: onClose, children: "Continue" })
      ] })
    }
  );
}
function clampInt(n, min, max) {
  return Math.max(min, Math.min(max, Math.round(n)));
}
function uniq(list) {
  return Array.from(new Set(list));
}
function computeReward(attempts, challengeId) {
  const list = attempts.filter((a) => a.challengeId === challengeId);
  if (list.length === 0) return { xp: 0, coins: 0, badges: [] };
  const successes = list.filter((a) => a.success).sort((a, b) => a.createdAt - b.createdAt);
  const failures = list.filter((a) => !a.success);
  const firstSuccess = successes[0] ?? null;
  const badges = [];
  if (list.length === 1) badges.push("Tried It");
  let xp = 0;
  let coins = 0;
  if (firstSuccess && successes.length === 1) {
    badges.push("First Win");
    const moves = Math.max(0, firstSuccess.movesUsed);
    const seconds = Math.max(0, firstSuccess.timeTaken / 1e3);
    const failCount = failures.length;
    const speedBonus = seconds <= 6 ? 10 : seconds <= 12 ? 6 : seconds <= 20 ? 3 : 0;
    const efficiencyBonus = moves <= 6 ? 10 : moves <= 10 ? 6 : moves <= 16 ? 3 : 0;
    const penalty = Math.min(30, failCount * 5);
    xp = clampInt(60 + speedBonus + efficiencyBonus - penalty, 20, 80);
    const coinSpeedBonus = seconds <= 6 ? 6 : seconds <= 12 ? 4 : seconds <= 20 ? 2 : 0;
    const coinEffBonus = moves <= 6 ? 6 : moves <= 10 ? 4 : moves <= 16 ? 2 : 0;
    const coinPenalty = Math.min(15, failCount * 3);
    coins = clampInt(25 + coinSpeedBonus + coinEffBonus - coinPenalty, 10, 40);
  }
  if (firstSuccess && successes.length === 1) {
    if (firstSuccess.timeTaken <= 8e3) badges.push("Speed Star");
    if (firstSuccess.movesUsed <= 8) badges.push("Move Master");
    if (failures.length >= 3) badges.push("Never Give Up");
    if (failures.length === 0) badges.push("Perfect Run");
  }
  return { xp, coins, badges: uniq(badges) };
}
function Cup({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-extrabold text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 w-14 h-14 rounded-2xl border-2 border-border bg-card grid place-items-center text-xl shadow-sm", children: value })
  ] });
}
function SwapCupsExplainer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded-2xl border-2 border-border bg-card/60 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-extrabold text-sm", children: "Swap using a helper cup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "w-4 h-4 text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cup, { label: "Cup A", value: "🥤" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cup, { label: "Cup B", value: "🧃" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cup, { label: "Cup C (helper)", value: "☕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "mt-3 text-xs font-semibold text-muted-foreground list-decimal pl-4 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pour A into C (store it safely)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pour B into A." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pour C into B." })
    ] })
  ] });
}
const BlocklyWorkspace = reactExports.lazy(() => import("./BlocklyWorkspace-BHwERy10.mjs"));
function directionalFeedback(finalPos, goalPos) {
  const dx = finalPos.x - goalPos.x;
  const dy = finalPos.y - goalPos.y;
  const lines = [];
  if (dx > 0) lines.push(`Chai! You went ${dx} step${dx > 1 ? "s" : ""} too far to the right. Remove ${dx} Move Right block${dx > 1 ? "s" : ""} and try again!`);
  else if (dx < 0) lines.push(`Eii! You need ${-dx} more step${-dx > 1 ? "s" : ""} to the right. Add ${-dx} Move Right block${-dx > 1 ? "s" : ""} and run again!`);
  if (dy > 0) lines.push(`You went ${dy} step${dy > 1 ? "s" : ""} too high. Remove ${dy} Move Up block${dy > 1 ? "s" : ""}, my friend!`);
  else if (dy < 0) lines.push(`You need ${-dy} more step${-dy > 1 ? "s" : ""} going up. Add ${-dy} Move Up block${-dy > 1 ? "s" : ""} — you are almost there!`);
  return lines.length ? lines.join(" ") : "Hmm! Try small changes: add one block, then run again. You’ve got this!";
}
function PlayPage() {
  const lesson = Route$1.useLoaderData();
  const {
    c
  } = Route$1.useSearch();
  const challenge = (c ? lesson.challenges.find((ch) => ch.id === c) : null) ?? getPrimaryChallenge(lesson);
  if (!challenge) {
    throw new Error(`Invalid lesson payload: no challenges. lessonId=${lesson.id}`);
  }
  const isGrid = isGridChallenge(challenge);
  const isQuiz = isQuizChallenge(challenge);
  const startStep = isGrid && challenge.start ? {
    x: challenge.start.x,
    y: challenge.start.y
  } : {
    x: 0,
    y: 0
  };
  const gridSize = isGrid ? Math.max(4, challenge.grid?.width ?? 0, challenge.grid?.height ?? 0, startStep.x + 1, startStep.y + 1, (challenge.goalPos?.x ?? 0) + 1, (challenge.goalPos?.y ?? 0) + 1) : 4;
  const [code, setCode] = reactExports.useState("");
  const [trail, setTrail] = reactExports.useState([startStep]);
  const [feedback, setFeedback] = reactExports.useState({
    kind: "idle"
  });
  const [showHint, setShowHint] = reactExports.useState(false);
  const [reward, setReward] = reactExports.useState(false);
  const [rewardData, setRewardData] = reactExports.useState({
    coins: 0,
    xp: 0
  });
  const [animating, setAnimating] = reactExports.useState(false);
  const [runStartedAt, setRunStartedAt] = reactExports.useState(null);
  const [quizAnswer, setQuizAnswer] = reactExports.useState("");
  const [quizStartedAt, setQuizStartedAt] = reactExports.useState(null);
  const navigate = useNavigate();
  const {
    awardCoins,
    addXp,
    unlockBadge,
    completeChallenge,
    recordAttempt
  } = useProgressStore();
  const attempts = useProgressStore((s) => s.attempts);
  const userId = useUserStore((s) => s.userId);
  const makeAttemptId = () => globalThis.crypto?.randomUUID?.() ?? `att_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const onAnimationEnd = reactExports.useCallback(() => {
    if (!isGrid) return;
    if (!challenge.goalPos) throw new Error("Invalid grid challenge: missing goalPos");
    setAnimating(false);
    const result = simulate(code, startStep);
    const win = result.finalPos.x === challenge.goalPos.x && result.finalPos.y === challenge.goalPos.y;
    if (runStartedAt) {
      const createdAt = Date.now();
      const timeTaken = Math.max(0, createdAt - runStartedAt);
      const movesUsed = Math.max(0, (result.trail?.length ?? 1) - 1);
      const attempt = {
        id: makeAttemptId(),
        challengeId: challenge.id,
        type: "grid",
        success: win,
        timeTaken,
        movesUsed,
        createdAt
      };
      recordAttempt(attempt);
      setRunStartedAt(null);
      if (win) {
        const r = computeReward([...attempts, attempt], challenge.id);
        completeChallenge(challenge.id);
        awardCoins(r.coins);
        addXp(r.xp);
        for (const b of r.badges) unlockBadge(b);
        setRewardData({
          coins: r.coins,
          xp: r.xp,
          badge: r.badges[0]
        });
        if (userId) void syncAttempts(userId);
      }
    }
    if (win) {
      playSfx("success");
      const msg = "Eiii, you did it! I knew you could fly me to the Moon!";
      setFeedback({
        kind: "ok",
        msg
      });
      void narrate(msg);
      setReward(true);
    } else {
      playSfx("error");
      const msg = directionalFeedback(result.finalPos, challenge.goalPos);
      setFeedback({
        kind: "err",
        msg
      });
      void narrate(msg);
    }
  }, [attempts, code, challenge, isGrid, recordAttempt, runStartedAt, startStep, userId]);
  const onRun = () => {
    if (!isGrid) return;
    if (!challenge.start) throw new Error("Invalid grid challenge: missing start");
    if (!code.trim()) {
      playSfx("error");
      const msg = "Hei! Please drag some Move blocks and snap them under ✦ When Run is pressed first — then we can fly!";
      setFeedback({
        kind: "err",
        msg
      });
      void narrate(msg);
      return;
    }
    const startedAt = Date.now();
    setRunStartedAt(startedAt);
    const result = simulate(code, startStep);
    if (result.error) {
      playSfx("error");
      setFeedback({
        kind: "err",
        msg: result.error
      });
      void narrate(result.error);
      const createdAt = Date.now();
      recordAttempt({
        id: makeAttemptId(),
        challengeId: challenge.id,
        type: "grid",
        success: false,
        timeTaken: Math.max(0, createdAt - startedAt),
        movesUsed: 0,
        createdAt
      });
      setRunStartedAt(null);
      return;
    }
    setTrail(result.trail);
    setAnimating(true);
    setFeedback({
      kind: "idle"
    });
  };
  const onReset = () => {
    setTrail([startStep]);
    setFeedback({
      kind: "idle"
    });
    setAnimating(false);
  };
  const onSubmitQuiz = () => {
    if (!isQuiz) return;
    const createdAt = Date.now();
    const startedAt = quizStartedAt ?? createdAt;
    const timeTaken = Math.max(0, createdAt - startedAt);
    const kind = challenge.quiz?.kind ?? "text";
    let success = false;
    let normalizedAnswer = quizAnswer.trim();
    if (kind === "number") {
      const n = Number(quizAnswer);
      normalizedAnswer = n;
      success = Number.isFinite(n) && typeof challenge.quiz?.answer === "number" && n === challenge.quiz.answer;
    } else if (kind === "multipleChoice") {
      normalizedAnswer = quizAnswer;
      success = Boolean(challenge.quiz?.correctChoiceId) && quizAnswer === challenge.quiz.correctChoiceId;
    } else {
      const acceptable = (challenge.quiz?.acceptableAnswers ?? []).map((s) => s.trim().toLowerCase());
      success = acceptable.length ? acceptable.includes(quizAnswer.trim().toLowerCase()) : quizAnswer.trim().length > 0;
    }
    const attempt = {
      id: makeAttemptId(),
      challengeId: challenge.id,
      type: "quiz",
      success,
      timeTaken,
      movesUsed: 0,
      createdAt,
      answer: normalizedAnswer
    };
    recordAttempt(attempt);
    if (success) {
      const r = computeReward([...attempts, attempt], challenge.id);
      completeChallenge(challenge.id);
      awardCoins(r.coins);
      addXp(r.xp);
      for (const b of r.badges) unlockBadge(b);
      setRewardData({
        coins: r.coins,
        xp: r.xp,
        badge: r.badges[0]
      });
      if (userId) void syncAttempts(userId);
      const msg = "Eiii! Correct! You are learning fast!";
      setFeedback({
        kind: "ok",
        msg
      });
      void narrate(msg);
      setReward(true);
    } else {
      const msg = "Not yet — try again, you can do it!";
      setFeedback({
        kind: "err",
        msg
      });
      void narrate(msg);
    }
  };
  const codeReady = code.trim().length > 0;
  const feedbackText = feedback.kind === "idle" ? isGrid ? "Snap some blocks under 'When Run is pressed', then hit Run — let us fly!" : "Read the question and answer it — you can do it!" : feedback.kind === "ok" ? "🎉 " + feedback.msg : "🤔 " + feedback.msg;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/lesson/$id", params: {
        id: lesson.id
      }, className: "inline-flex items-center gap-1 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
        " Lesson"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-extrabold text-lg truncate", children: challenge.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowHint((s) => !s), className: "inline-flex items-center gap-1 text-sm font-bold text-primary", id: "hint-toggle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4" }),
          " Hint"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SoundToggle, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 grid lg:grid-cols-2 gap-4 px-4 pb-4 max-w-5xl w-full mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-3", children: [
        isGrid && challenge.goalPos ? /* @__PURE__ */ jsxRuntimeExports.jsx(GridSim, { size: gridSize, trail, goal: challenge.goalPos, animating, onAnimationEnd }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border-2 border-border p-5 shadow-[var(--shadow-soft)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-semibold", children: "QUESTION" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-lg font-extrabold", children: challenge.quiz?.question ?? challenge.prompt }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground font-semibold", children: challenge.goal }),
          challenge.quiz?.kind === "multipleChoice" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2", children: (challenge.quiz?.choices ?? []).map((c2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (!quizStartedAt) setQuizStartedAt(Date.now());
            setQuizAnswer(c2.id);
          }, className: ["text-left rounded-2xl border-2 px-5 py-4 min-h-14 font-bold text-base sm:text-lg transition-colors flex items-center", quizAnswer === c2.id ? "border-primary bg-primary/10" : "border-border bg-card"].join(" "), children: c2.label }, c2.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: quizAnswer, onChange: (e) => {
            if (!quizStartedAt) setQuizStartedAt(Date.now());
            setQuizAnswer(e.target.value);
          }, placeholder: challenge.quiz?.kind === "number" ? "Type a number…" : "Type your answer…", className: "font-bold", inputMode: challenge.quiz?.kind === "number" ? "numeric" : void 0 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SyncStatus, {}),
        showHint && /* @__PURE__ */ jsxRuntimeExports.jsxs(SpeechBubble, { arrow: "none", className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "💡 ",
            challenge.hint ?? challenge.hints?.[0] ?? "Try again — you can do it!"
          ] }),
          /\bswap\b/i.test(challenge.title ?? "") || /\bswap\b/i.test(challenge.prompt ?? "") ? /* @__PURE__ */ jsxRuntimeExports.jsx(SwapCupsExplainer, {}) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mascot, { size: "sm", bob: animating }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SpeechBubble, { className: "flex-1 text-sm", arrow: "left", children: feedbackText })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-3 min-h-[420px]", children: [
        isQuiz ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { variant: "ghost", onClick: () => {
            setQuizAnswer("");
            setFeedback({
              kind: "idle"
            });
          }, className: "flex-1", children: "Clear" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { variant: "success", onClick: onSubmitQuiz, className: "flex-[2]", disabled: !quizAnswer.trim(), children: "Submit Answer" })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 grid place-items-center rounded-2xl border-2 border-dashed border-border bg-card/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground font-bold", children: "Loading code blocks…" })
        ] }) }), children: isGrid ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-[360px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlocklyWorkspace, { onCodeChange: setCode }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 grid place-items-center rounded-2xl border-2 border-dashed border-border bg-card/50 p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-extrabold text-lg", children: "No blocks needed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-semibold mt-1", children: "This is a thinking challenge — answer the question on the left." })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { variant: "ghost", onClick: onReset, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-5 h-5" }), className: "flex-1", disabled: animating, children: "Reset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BigButton, { variant: "success", onClick: onRun, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }), className: cn("flex-[2] transition-all", codeReady && !animating && "animate-pulse shadow-[0_0_16px_oklch(0.75_0.16_155/0.5)]"), disabled: !isGrid || animating, children: animating ? "Flying…" : "Run Code" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RewardModal, { open: reward, coins: rewardData.coins, xp: rewardData.xp, badge: rewardData.badge, onClose: async () => {
      setReward(false);
      try {
        const lessons = await fetchLessons();
        const next = getNextLevel(lessons, lesson.id, challenge.id);
        if (next) {
          queueNarration("Great job! Next mission loading now.");
          navigate({
            to: "/lesson/$id",
            params: {
              id: next.lessonId
            },
            search: {
              c: next.challengeId
            }
          });
          return;
        }
      } catch {
      }
      navigate({
        to: "/journey"
      });
    } })
  ] });
}
export {
  PlayPage as component
};
