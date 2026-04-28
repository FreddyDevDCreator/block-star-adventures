# Backend Campaign + Story Seed Spec (hand to backend)

Date: 2026-04-28

This frontend is now **fully backend-driven** for lessons (`/api/lessons`) and supports **multiple challenge types** (`grid` and `quiz`).  
To make the product feel like a **mobile game with a real story + levels**, the backend must seed a **campaign (journey)** and expose it via API.

---

## 1) Product goal

Kids should feel:
- “I’m on **World 2 — Level 6**”
- “I unlocked the next mission!”

Parents should see:
- progress that makes sense
- evidence the child is improving over time

Final outcome:
- kids learn real programming concepts (sequencing → loops → conditions → variables → functions)
- transferable to writing real code and building apps

---

## 2) Required backend endpoints

### A) Campaign (NEW)

#### GET `/api/campaign`
Returns the full journey structure.

**Response (200)**
```json
{
  "version": "1.0.0",
  "worlds": [
    {
      "id": "world-launchpad",
      "title": "Launchpad",
      "subtitle": "Become a Rookie Coder",
      "order": 1,
      "levels": [
        {
          "id": "lvl-1",
          "order": 1,
          "title": "First Steps",
          "storyIntro": "Bolt wants to launch, but the checklist is mixed up!",
          "lessonId": "lesson-sequencing",
          "challengeId": "seq-1",
          "unlockRule": { "type": "always" },
          "badgeOnComplete": "Launch Rookie"
        }
      ]
    }
  ]
}
```

**Rules**
- `lessonId` and `challengeId` must match seeded lessons/challenges.
- `order` must be stable.

---

### B) Lessons (existing, but MUST include story + type)

#### GET `/api/lessons`
#### GET `/api/lessons/:lessonId`

Each challenge must include:
- `type: "grid" | "quiz"`
- `scenes[]` (story beats)
- `hint` / `hints`

For `grid` challenges, include:
- `grid`, `start`, `goalPos` (and optionally `blocked`)

For `quiz` challenges, include:
- `quiz` payload with correctness fields:
  - `kind: "number" | "text" | "multipleChoice"`
  - and one of:
    - `answer` (number)
    - `correctChoiceId` (multipleChoice)
    - `acceptableAnswers` (text)

---

### C) Attempts sync (existing)

#### POST `/api/attempts/bulk`
Must accept attempts with:
- `type` (`grid` or `quiz`)
- `answer` required for `quiz`

Idempotency is still critical: unique `(userId, attempt.id)`.

---

## 3) What the backend must seed (minimum “game-like” content)

### World 1 — Launchpad (Sequencing)
Goal: teach step-by-step thinking.

Seed:
- `lesson-sequencing`
  - `seq-1` (quiz, multipleChoice)
  - `seq-2` (grid, easy)
  - `seq-boss` (grid, slightly harder) — “Launch the rocket”

### World 2 — Moonbase (Loops)
Seed:
- `lesson-loops`
  - `loop-1` (quiz)
  - `loop-2` (grid)
  - `loop-boss` (grid) — “Power the Moonbase”

### World 3 — Asteroid Belt (Conditions)
Seed:
- `lesson-conditions`
  - `if-1` (quiz)
  - `if-2` (grid with blocked tiles)
  - `if-boss` (grid)

### World 4 — Space Station (Variables)
Seed:
- `lesson-variables`
  - `var-1` (quiz, number, answer must be provided)
  - `var-2` (quiz, text with `acceptableAnswers`)
  - `var-boss` (quiz or grid hybrid later)

### World 5 — Galaxy Lab (Functions)
Seed:
- `lesson-functions`
  - `fn-1` (quiz)
  - `fn-2` (grid)
  - `final-boss` (grid)

---

## 4) Story requirements (so it feels like a real game)

For every level, seed:
- `storyIntro` (why this mission matters in the story)
- `scenes[]` that *feel like dialogue* (Bolt + Coach)
- completion payoff:
  - `badgeOnComplete`
  - optional: `storyOutro`

Tone requirements:
- short lines
- child-friendly
- consistent characters

---

## 5) Backend-derived “Level/Rank” (optional but recommended)

To support “I’m in Level X” reliably across devices:

### GET `/api/progress/:userId` (recommended)
Returns:
- completed `levelIds`
- current `levelId`
- summary metrics (optional)

Frontend can still work offline; this endpoint improves multi-device consistency.

---

## 6) Why dashboard stats sometimes look “not working”

Stats require attempts for a specific `challengeId`.

Backend campaign solves this by defining the **current level challengeId** so the dashboard can:
- show “Current mission stats”
- show “Last 3 attempts trend”

---

## 7) Acceptance checklist (backend)

- [ ] `/api/campaign` returns ordered worlds/levels mapping lessonId + challengeId
- [ ] Every challenge has `type`
- [ ] All `quiz` challenges provide correctness fields (`answer`/`correctChoiceId`/`acceptableAnswers`)
- [ ] All `grid` challenges provide `grid/start/goalPos`
- [ ] `/api/attempts/bulk` accepts `type` and `answer` for quiz attempts
- [ ] IDs are stable and match between campaign and lessons

