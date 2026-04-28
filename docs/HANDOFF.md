# Block Star Adventures — Session Handoff

> Copy this file into a ChatGPT conversation to continue work with full context.

---

## Project overview

**Block Star Adventures** (`block-star-adventures/`) is a browser-only educational coding game for African children aged 10–14 (low-literacy, low-resource environments). Stack:

| Layer | Technology |
|---|---|
| Framework | **Vite + React 18 + TypeScript** |
| Routing | **TanStack Router** (file-based, `src/routes/`) |
| Blocks | **Blockly** (lazy-loaded, only on play screen) |
| State | **Zustand** — persisted to **IndexedDB** via `idb` |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"`) + `tw-animate-css` |
| Audio | **Web Speech API** + **WebAudio API** (no audio files) |
| Dev server | `npm run dev` → `http://localhost:8080` |

All app code is under `block-star-adventures/src/`. There is no backend.

---

## What we built in this session

### Fix 1 — "Run Code" always feels responsive

**Problem:** Kids stacked Move blocks but the rocket never moved. Two root causes:
1. Blockly only generates code from blocks connected to a *top/hat* block. Loose floating blocks produce empty code → silent failure.
2. Even when code ran, the rocket teleported to its final position instantly with no animation.

**Solution shipped:**

#### `src/features/blockly/BlocklyWorkspace.tsx`
- Registered a new **`on_start` hat block** ("✦ When Run is pressed", green `#22c55e`, non-deletable).
- All generator registrations now use **`javascriptGenerator.forBlock[type]`** (Blockly v10 API) — the old direct-property pattern was silently ignored.
- A `DEFAULT_WORKSPACE_XML` pre-places the hat block whenever the workspace loads with no saved XML.

#### `src/features/blockly/toolbox.ts`
- Added `on_start` as first item in the flyout toolbox.

#### `src/features/blockly/GridSim.tsx`
- Now accepts `animating: boolean` and `onAnimationEnd: () => void` props.
- Steps through the `trail` array at **250 ms per tile** using `setInterval`.
- The rocket bobs (`animate-[bob_0.5s…]`) while moving.
- `onAnimationEnd` fires after the last frame — win/loss evaluation is deferred until **after** the animation so kids see Bolt travel first.

#### `src/routes/play.$id.tsx`
- **Empty-code detection**: if `code.trim() === ""` → friendly error message + SFX, no simulation.
- **Directional "almost" feedback**: tells kids exactly which way and how many blocks to adjust.
- Run button **pulses** when code is non-empty.
- Run button **disabled + labelled "Flying…"** while animation plays.
- Reset button also disabled during animation.
- `SoundToggle` added to page header.

---

### Fix 2 — Mascot voice (Web Speech API)

**Problem:** `src/services/audio.ts` was a stub (all no-ops).

**Solution shipped:**

#### `src/services/audio.ts`
- `speak(text, opts?)` — picks the best available voice, cancels any current utterance.
- `stopSpeaking()` — cancels speech on unmount / navigation.
- `playSfx(name)` — short WebAudio tones (success chime, error buzz, coin ping, click tick). No audio files.
- **Voice priority**: African English locales first (`en-NG`, `en-GH`, `en-KE`, `en-ZA`, `en-TZ`, `en-UG`), then Google British English, then any British English, then any English.
- **Speech parameters**: pitch `1.05`, rate `0.88` — warmer, more measured African English cadence.
- `utt.lang` set to the matched voice's own locale (not forced to `en-US`).

#### `src/store/useSettingsStore.ts` *(new)*
- Created domain-specific settings store (`soundOn`, `toggleSound`).
- Decoupled from `useGameStore` to resolve "god object" concerns.
- Persists to IndexedDB independently.

#### `src/hooks/useSpeak.ts` *(new)*
```ts
useSpeak(text: string, enabled?: boolean): void
```
- Calls `speak(text)` whenever `text` changes, gated on `soundOn` from `useSettingsStore`.
- Calls `stopSpeaking()` on unmount.

#### `src/store/useGameStore.ts`
- Stripped `soundOn` and `toggleSound` actions.
- Now strictly focused on game progress, reading `soundOn` purely from `useSettingsStore.getState()` when serializing the full IDB `UserProfile`.

#### `src/services/db.ts`
- Added `soundOn: boolean` to `UserProfile` interface and `defaultProfile`.
- `loadProfile` does `{ ...data, soundOn: data.soundOn ?? true }` for back-compat with old DB records.

#### `src/components/cq/SoundToggle.tsx` *(new)*
- Small `Volume2` / `VolumeX` icon button, mounted in every page header.

#### `src/components/cq/SpeechBubble.tsx`
- Added optional `speak?: boolean` prop — when true, narrates bubble text via `useSpeak`.

#### `src/components/cq/RewardModal.tsx`
- Calls `speak(...)` when the modal opens. Message: *"Eiii! You are a champion!…"*

#### Routes wired up
| Route | Change |
|---|---|
| `onboarding.tsx` | `SpeechBubble speak` prop narrates each step; `SoundToggle` added |
| `lesson.$id.tsx` | `SpeechBubble speak` narrates each scene bubble; `SoundToggle` in header |
| `dashboard.tsx` | `SoundToggle` in header |
| `rewards.tsx` | `SoundToggle` in header |

---

### Fix 3 — African-relatable voice content

All spoken strings updated to warm African English expressions:

- **Onboarding**: *"Eiii, welcome! I am Bolt — your coding partner!"*
- **Lesson bubbles**: *"Eiii! I have been waiting to fly! Will you help me reach the Moon, my friend?"*
- **Play idle**: *"Snap some blocks under 'When Run is pressed', then hit Run — let us fly!"*
- **Win**: *"Eiii, you did it! I knew you could fly me to the Moon!"*
- **Directional hints**: *"Chai! You went 2 steps too far to the right."*
- **Reward modal**: *"Eiii! You are a champion! Well done, my friend!"*

Content files: `src/features/onboarding/steps.ts`, `src/features/lessons/lessonData.ts`.

---

### Fix 4 — Architecture Refactor (State Decoupling)

- Implemented Step 1 & 2 of the `frontend_state_architecture_refactor_guide.md`.
- `soundOn` preference and `toggleSound` action were extracted out of the `useGameStore` god-object into their own highly focused `useSettingsStore`.
- React hooks (`useSpeak`), UI components (`SoundToggle`, `RewardModal`), and app-boot sequences (`index.tsx`) were cleanly decoupled from the rest of the game state machinery.

---

## Bug fixes in this session

| Bug | Root cause | Fix |
|---|---|---|
| `on_start` generator error | Blockly v10 uses `forBlock[type]`, not direct property assignment | Changed all registrations to `javascriptGenerator.forBlock[name]` |
| IDB `DataCloneError` | `get()` spreads Zustand action functions into `persist()` | Added `toProfile()` that extracts only serializable fields |

---

## Current file tree (changed files only)

```
src/
  services/
    audio.ts          ← Web Speech + WebAudio SFX (was stub)
    db.ts             ← added soundOn to UserProfile
  store/
    useGameStore.ts   ← added soundOn, toggleSound, toProfile()
  hooks/
    useSpeak.ts       ← NEW
  components/cq/
    SoundToggle.tsx   ← NEW
    SpeechBubble.tsx  ← added speak prop
    RewardModal.tsx   ← speaks reward on open
  features/
    blockly/
      BlocklyWorkspace.tsx  ← on_start block + forBlock API
      GridSim.tsx           ← tile-by-tile animation
      toolbox.ts            ← on_start in flyout
    onboarding/
      steps.ts        ← African English text
    lessons/
      lessonData.ts   ← African English bubble text
  routes/
    play.$id.tsx      ← empty detection, animation, directional feedback
    onboarding.tsx    ← SoundToggle + speak prop
    lesson.$id.tsx    ← SoundToggle + speak prop
    dashboard.tsx     ← SoundToggle
    rewards.tsx       ← SoundToggle
  styles.css          ← shake + pulse-glow keyframes
```

---

## Design decisions & constraints

- **No recorded audio files** — Web Speech + WebAudio only. Works offline.
- **`on_start` block is non-deletable** (XML `deletable="false"`). Kids can still trash movement blocks.
- **Win/loss evaluation happens inside `onAnimationEnd`** — children always see Bolt travel before feedback.
- **African locale voices** (`en-NG`, `en-GH`, etc.) only available on Chrome for Android with Google TTS; desktop fallback is `en-GB`.

---

## Known caveats / what's not done yet

- Only one lesson exists (`rocket-to-the-moon`). The data structure supports adding more.
- No user name input in onboarding (store has `setName` but the flow skips it).
- No offline PWA manifest / service worker yet.
- Recorded human voiceover would be more authentic but adds cost + network dependency.

---

## How to run

```bash
cd block-star-adventures
npm install
npm run dev          # → http://localhost:8080
```

TypeScript check:
```bash
node node_modules/typescript/bin/tsc --noEmit
```
