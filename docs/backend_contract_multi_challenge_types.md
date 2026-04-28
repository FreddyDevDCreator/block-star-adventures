# Backend contract — Multi Challenge Types (Grid + Quiz/Text)

Date: 2026-04-28

## Why this is needed
The frontend currently has a **grid-sim Blockly play mode**, but lessons like **Variables** are naturally **quiz/text** challenges (not movement on a grid).  
To “do it right”, the backend must explicitly support **multiple challenge types** so:
- the frontend can render the correct play UI per challenge
- attempts can be validated consistently
- analytics stay comparable (attempts are still the source of truth)

---

## Core idea
Each `challenge` must declare a `type`, and its payload must include the required fields for that type.

### Supported types (v1)
- `grid` — Blockly + grid simulator (movement/goal)
- `quiz` — answer-based challenge (number/text/multiple choice)

You can extend later with `puzzle`, `debug`, `fillInBlocks`, etc.

---

## Endpoint summary (unchanged paths, richer payload)

- `GET /api/lessons/manifest` → `{ "version": "…" }`
- `GET /api/lessons` → lessons list (with `challenges[]`)
- `GET /api/lessons/:lessonId` → full lesson (with `challenges[]`)
- `POST /api/attempts/bulk` → ingest attempts (append-only, idempotent)

---

## Lesson shape (high level)

```json
{
  "id": "lesson-variables",
  "title": "Variables: Remembering values",
  "summary": "Use named boxes to store information...",
  "ageGroup": "kid",
  "challenges": [ /* see below */ ]
}
```

---

## Challenge: shared fields (all types)

Every challenge must include:

```json
{
  "id": "var-1",
  "type": "quiz",
  "title": "Score keeper",
  "concept": "variables",
  "prompt": "…",
  "goal": "…",
  "hint": "…",
  "hints": ["…"],
  "scenes": [
    { "id": "s1", "speaker": "Coach", "text": "…" }
  ]
}
```

Notes:
- `type` is required.
- `scenes` is optional but recommended for story-driven learning.

---

## Challenge: `grid` type (for Blockly + GridSim)

Required fields:

```json
{
  "type": "grid",
  "grid": {
    "width": 5,
    "height": 5,
    "blocked": [{ "x": 1, "y": 2 }]
  },
  "start": { "x": 0, "y": 4, "dir": "E" },
  "goalPos": { "x": 4, "y": 0 }
}
```

Rules:
- `start` and `goalPos` must always exist for `grid` challenges.
- `grid.width/height` must be consistent with coordinates.
- `blocked` can be omitted or empty.

---

## Challenge: `quiz` type (Variables, sequencing questions, etc.)

### Quiz subtypes
Support one of:
- `number`
- `text`
- `multipleChoice`

Recommended payload:

```json
{
  "type": "quiz",
  "quiz": {
    "kind": "number",
    "question": "You start with score = 0. You earn 10 points, then 5 points. What is score now?",
    "answer": 15,
    "explanation": "10 + 5 = 15. The variable changes as you add points."
  }
}
```

Multiple choice example:

```json
{
  "type": "quiz",
  "quiz": {
    "kind": "multipleChoice",
    "question": "Which step must come first?",
    "choices": [
      { "id": "a", "label": "Eat it" },
      { "id": "b", "label": "Get bread" }
    ],
    "correctChoiceId": "b",
    "explanation": "You can’t eat before you make it."
  }
}
```

Text example:

```json
{
  "type": "quiz",
  "quiz": {
    "kind": "text",
    "question": "How can you swap Cup A and Cup B using Cup C?",
    "acceptableAnswers": [
      "A->C, B->A, C->B",
      "Pour A into C, pour B into A, pour C into B"
    ],
    "explanation": "Cup C is a temporary variable."
  }
}
```

---

## Attempts: backend-aligned validation for multiple types

### Attempt payload (frontend → backend)
To support multiple types, backend should accept:

```json
{
  "id": "attempt_uuid",
  "challengeId": "var-1",
  "type": "quiz",
  "success": true,
  "timeTaken": 5400,
  "movesUsed": 0,
  "createdAt": 1714310000000,
  "answer": 15
}
```

For `grid` challenges:
- `type: "grid"`
- `movesUsed` should be meaningful (trail length or executed steps)
- optionally include `code` or `programXml` if you want deeper analytics later

For `quiz` challenges:
- `answer` (number/string/choiceId)
- `movesUsed` can be `0` (or omitted)

Backend validation rules:
- must validate attempt shape **based on `type`**
- still must be idempotent by `(userId, attempt.id)`

---

## Optional (recommended): server-side verification endpoint

If you want backend-authoritative correctness (especially for quiz), add:

### POST `/api/challenges/:challengeId/verify`
Request:
```json
{ "userId": "…", "answer": 15 }
```
Response:
```json
{ "correct": true, "expected": 15 }
```

The frontend can still work offline by storing attempts locally, then verifying/syncing when online.

---

## Minimum backend change to unblock `lesson-variables`

Set `type: "quiz"` and add `quiz` payloads for `var-1` and `var-2`.  
Do **not** add fake grid coordinates to “variables” lessons.

