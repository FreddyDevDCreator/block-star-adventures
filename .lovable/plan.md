## CodeQuest — Gamified Coding Adventure for Kids

A mobile-first, offline-capable coding education app for kids 10–14. Built on the existing TanStack Start setup, with a friendly mascot guiding learners through a comic-style lesson, Blockly puzzles, and a rewarding progression loop.

---

### What we're building

**1. Mascot & Onboarding**
- Generate an illustrated friendly robot/explorer mascot (AI image) used across onboarding, dashboard, dialogue bubbles, and reward screens.
- Fullscreen onboarding flow: 4–5 dialogue steps where the mascot welcomes the child, explains the dashboard, lessons, coding area, and rewards.
- Step-by-step bubble UI with big Next / Skip buttons. Stub `playNarration(text)` hook ready for future TTS/audio.

**2. Dashboard (Home)**
- Big avatar card, current level + XP bar, coin counter, badge shelf.
- Prominent "Continue Learning" CTA pointing to the next scene.
- Mobile-first layout, tap targets ≥ 56px, bright but soft palette (sky blue / sunshine yellow / mint).

**3. Comic-Style Lesson Viewer**
- One richly built lesson: **"Rocket to the Moon"** — ~6 scenes teaching sequence, loops, and conditionals through a story.
- Each scene: illustration placeholder panel + short text + speech bubble from mascot.
- Slide/fade transitions between scenes, swipe + button navigation, scene dots indicator.

**4. Blockly Coding Environment**
- Lazy-loaded Blockly workspace (heavy dep, code-split) with a kid-friendly toolbox: Move, Turn, Repeat, If.
- "Run Code" button converts blocks → JS → runs against a tiny canvas simulator (rocket moves on a grid toward the moon).
- Live feedback: success burst animation, gentle error toast with retry.

**5. Challenge & Validation**
- Each challenge has a target end-state (e.g. rocket reaches goal tile).
- Simple comparison validates the simulated outcome; success triggers reward modal, failure offers Retry / Hint.

**6. Gamification & Rewards**
- Reward modal with confetti, coins +N, optional badge unlock, level-up animation.
- Coins, XP, badges, and level live in a Zustand store backed by IndexedDB.

**7. Progress Tracking & Offline**
- IndexedDB (via `idb`) stores: user profile, completed scenes, attempts, coins, badges.
- Mock `services/api.ts` simulates sync with delays so the structure is sync-ready.
- All lesson content + mascot image bundled locally so the app works without network after first load. (Skipping service worker per your call — IndexedDB-only.)

---

### Routes

```
/              Splash → routes to onboarding or dashboard based on saved profile
/onboarding    Mascot-led intro flow
/dashboard     Home with avatar, level, coins, continue button
/lesson/$id    Comic scene viewer
/play/$id      Blockly challenge (lazy-loaded)
/rewards       Badge/trophy gallery
```

Each route gets its own `head()` metadata.

---

### Project structure

```
src/
  routes/                  index, onboarding, dashboard, lesson.$id, play.$id, rewards
  features/
    onboarding/            DialogueBubble, OnboardingFlow, steps.ts
    dashboard/             AvatarCard, StatsBar, ContinueButton
    lessons/               SceneViewer, SceneNav, lessonData.ts
    blockly/               BlocklyWorkspace.lazy, toolbox.ts, simulator.ts, RunPanel
    rewards/               RewardModal, BadgeShelf, Confetti
    progress/              ProgressBar, LevelChip
  components/              Mascot, BigButton, SpeechBubble, IconBadge, Toast
  store/                   useGameStore.ts (Zustand)
  services/                db.ts (idb wrapper), api.ts (mock sync), audio.ts (stub)
  hooks/                   useNarration, useConfetti, useFirstVisit
  utils/                   xp.ts, validate.ts
  assets/                  mascot.png (generated)
```

---

### Visuals & UX

- Palette tuned in `styles.css`: friendly sky blue primary, sunshine yellow accent, mint success, coral error. Rounded-2xl everywhere, soft shadows.
- Mascot generated via AI image (stored locally as PNG) — single character reused across the app.
- All buttons large with icons + minimal text, Lucide icons throughout.
- Smooth transitions using existing `tw-animate-css` utilities + `animate-fade-in` / `animate-scale-in`.

---

### Performance

- Blockly imported via `React.lazy` + Suspense, only loads when entering `/play/$id`.
- Mascot image optimized PNG.
- No heavy UI kits added beyond what's already present.
- Mock data is plain TS, tree-shaken at build time.

---

### Technical notes

- Stack stays on TanStack Start + TanStack Router (existing setup); using React Router would require tearing out the shell with no benefit.
- State: Zustand (lighter than Context for game state with frequent updates).
- Persistence: `idb` library for IndexedDB; store hydrates on app boot.
- No service worker (avoids Lovable preview iframe issues).
- Blockly: `blockly` npm package, dynamic import inside the lazy route component to keep it out of the main bundle.
- All "API" calls go through `services/api.ts` returning Promises with simulated latency, so swapping for a real backend later is one-file change.

---

### Out of scope (for now)

- Real audio narration (stub only — easy to wire later).
- Real backend / auth.
- Service-worker offline shell.
- More than one fully-built lesson (architecture supports adding more by appending to `lessonData.ts`).