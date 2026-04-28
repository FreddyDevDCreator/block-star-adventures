# Backend requirements (Lessons + Identity + Sync)

Date: 2026-04-28

This repo is **frontend-only** and **consumes** backend APIs (no backend code lives here). This document describes what the backend must provide for a production-ready system.

---

## 1) Where do lessons come from right now?

### Current behavior (today)
Lessons are **bundled in the frontend**:
- `src/features/lessons/lessonData.ts` exports `LESSONS`

That means lessons are **not** coming from the backend yet.

### Should lessons be backend-driven?
**Yes, in production** (and for easy content updates). Backend-driven lessons allow:
- updating content without redeploying the frontend
- versioning (lesson manifest)
- analytics aligned to lesson/challenge IDs
- multi-lesson expansion and A/B tweaks later

---

## 2) Backend modules required

### A) User Identity

**POST** `/api/users`
- **Purpose**: create a user and return a persistent `userId`
- **Request**
```json
{ "name": "Alex", "avatar": "rocket", "ageGroup": "kid" }
```
- **Response**
```json
{ "userId": "mongodb_object_id_or_uuid" }
```
- **Rules**
  - Validate payload
  - Return only the identifier
  - Store `name/avatar/ageGroup`

**GET** `/api/users/:userId` (recommended)
- **Purpose**: fetch profile for a returning learner on a new device

---

### B) Attempts (bulk, idempotent ingest)

**POST** `/api/attempts/bulk`
- **Purpose**: receive unsynced attempts from the device and mark them persisted server-side
- **Request**
```json
{
  "userId": "…",
  "attempts": [
    {
      "id": "attempt_uuid",
      "challengeId": "rocket-1",
      "success": true,
      "timeTaken": 5400,
      "movesUsed": 8,
      "createdAt": 1714310000000
    }
  ]
}
```
- **Response**
```json
{ "ok": true, "stored": 1, "ignored": 0 }
```
- **Idempotency requirement (critical)**
  - Backend must treat `(userId, attempt.id)` as unique
  - If an attempt already exists, ignore it (do not create duplicates)
  - Return counts for demo/debug

---

### C) Lessons (content delivery)

**GET** `/api/lessons/manifest`
- **Purpose**: allow the frontend to check which lesson pack/version to use
- **Response**
```json
{ "version": "1.0.0" }
```

**GET** `/api/lessons`
- **Purpose**: return all lessons (or minimal listing)

**GET** `/api/lessons/:lessonId`
- **Purpose**: fetch a lesson by id

**Rules**
- Lesson/challenge IDs must remain stable (analytics + attempts depend on them)
- Backend should be the source of truth for lesson/challenge metadata

---

## 3) Sync expectations (frontend behavior the backend must support)

The frontend sync system assumes:
- attempts are **append-only**
- attempts are **never deleted** locally after syncing
- backend is **idempotent** (duplicates safe)
- intermittent failure is normal (offline-first)

Backend should:
- accept requests even if some attempts are duplicates
- respond quickly (the UI must not block)
- provide clear HTTP errors for invalid payloads

---

## 4) Optional (next after MVP)

- **GET** `/api/attempts?userId=...` for analytics dashboards
- **GET** `/api/progress/:userId` for derived progress snapshots
- **Reward snapshots** server-side if you want backend-authoritative reward history

