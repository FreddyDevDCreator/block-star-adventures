## Admin dashboard backend endpoints

This app uses `VITE_API_URL` as the base URL (default: `http://localhost:5000/api`) and calls endpoints below **relative to `/api`**.

The admin UI route is `/admin` and is gated behind `VITE_ADMIN_ENABLED=true` (otherwise it 404s).

### Auth / Admin access

- **GET `/auth/session`**
  - **Purpose**: identify current user + permissions (admin/teacher/student), used for guarding admin routes server-side.
  - **Response 200**

```json
{
  "user": { "id": "u_123", "name": "Ada", "role": "admin" },
  "tokenExpiresAt": "2026-05-07T12:00:00.000Z"
}
```

- **POST `/auth/login`**
  - **Purpose**: sign-in (email/password, magic link, etc.).
  - **Body**: implementation-specific.
  - **Response 200**: sets cookie (recommended) or returns bearer token.

- **POST `/auth/logout`**
  - **Purpose**: sign out.

> **Note**: For production, enforce admin authorization on the backend for all `/admin/*` routes. The frontend gating is only a convenience.

---

### Admin summary (used by the current `/admin` loader)

- **GET `/admin/summary`**
  - **Purpose**: single request powering the “Overview / Users / Lessons / Rewards” tabs.
  - **Response 200**

```json
{
  "totals": { "users": 120, "lessons": 14, "rewards": 9 },
  "recentUsers": [
    {
      "id": "u_123",
      "name": "Ada",
      "role": "student",
      "ageGroup": "teen",
      "createdAt": "2026-05-01T10:00:00.000Z",
      "lastActiveAt": "2026-05-07T11:20:00.000Z"
    }
  ],
  "lessons": [
    {
      "id": "lesson_1",
      "title": "Loops & Patterns",
      "published": true,
      "difficulty": "easy",
      "updatedAt": "2026-05-06T08:00:00.000Z"
    }
  ],
  "rewards": [
    {
      "id": "reward_1",
      "title": "Rocket Sticker",
      "costCoins": 50,
      "enabled": true,
      "updatedAt": "2026-05-02T09:00:00.000Z"
    }
  ]
}
```

---

### Users (admin)

- **GET `/admin/users`**
  - **Purpose**: list/filter users (pagination + search).
  - **Query**:
    - `q` (optional): search text
    - `role` (optional): `student|teacher|admin`
    - `cursor` (optional): for pagination
    - `limit` (optional, default 25)
  - **Response 200**

```json
{
  "items": [
    { "id": "u_123", "name": "Ada", "role": "student", "ageGroup": "teen", "createdAt": "..." }
  ],
  "nextCursor": "..."
}
```

- **POST `/admin/users`**
  - **Purpose**: create user (or invite).
  - **Body**

```json
{ "name": "Ada", "role": "student", "ageGroup": "teen" }
```

- **GET `/admin/users/:id`**
  - **Purpose**: view user details.
  - **Response 200**

```json
{
  "id": "u_123",
  "name": "Ada",
  "role": "student",
  "ageGroup": "teen",
  "createdAt": "...",
  "lastActiveAt": "...",
  "progress": { "xp": 1200, "level": 4, "coins": 310 },
  "badges": [{ "id": "b_1", "title": "First Launch", "earnedAt": "..." }]
}
```

- **PATCH `/admin/users/:id`**
  - **Purpose**: edit user fields (role, name, etc.).
  - **Body**: partial user.

- **POST `/admin/users/:id/reset-progress`**
  - **Purpose**: reset a user’s progress (dangerous, admin-only).
  - **Response 200**: `{ "ok": true }`

---

### Lessons / content (admin)

- **GET `/admin/lessons`**
  - **Purpose**: list lessons for admin management.
  - **Query**: `q`, `published`, `cursor`, `limit`

- **POST `/admin/lessons`**
  - **Purpose**: create a lesson (draft).
  - **Body (suggested minimal)**

```json
{ "title": "New lesson", "summary": "..." }
```

- **GET `/admin/lessons/:id`**
  - **Purpose**: fetch lesson details for editing (including challenges/scenes).

- **PATCH `/admin/lessons/:id`**
  - **Purpose**: update title/summary/difficulty/published, and optionally nested content.
  - **Body**: partial lesson update.

- **POST `/admin/lessons/:id/publish`**
  - **Purpose**: publish a lesson (or flip `published=true`).
  - **Response**: `{ "ok": true }`

- **POST `/admin/lessons/:id/unpublish`**
  - **Purpose**: unpublish a lesson (or flip `published=false`).

- **DELETE `/admin/lessons/:id`**
  - **Purpose**: delete a lesson (admin-only).

---

### Rewards / store (admin)

- **GET `/admin/rewards`**
  - **Purpose**: list rewards.
  - **Query**: `q`, `enabled`, `cursor`, `limit`

- **POST `/admin/rewards`**
  - **Purpose**: create reward.
  - **Body**

```json
{ "title": "Rocket Sticker", "costCoins": 50, "enabled": true }
```

- **GET `/admin/rewards/:id`**
  - **Purpose**: fetch reward details.

- **PATCH `/admin/rewards/:id`**
  - **Purpose**: update reward (title/cost/enabled).

- **DELETE `/admin/rewards/:id`**
  - **Purpose**: delete reward.

---

### Progress / analytics (admin) (recommended for “real” admin dashboard)

- **GET `/admin/analytics/overview`**
  - **Purpose**: KPI cards + trends.
  - **Query**: `from`, `to` (ISO), `groupBy=day|week`

- **GET `/admin/analytics/lesson/:lessonId`**
  - **Purpose**: lesson funnel/success metrics.

- **GET `/admin/analytics/user/:userId`**
  - **Purpose**: user progress timeline.

---

### Errors

Use consistent error shapes:

- **401**: not authenticated
- **403**: authenticated but not authorized
- **404**: resource not found

Suggested JSON error:

```json
{ "error": { "code": "FORBIDDEN", "message": "Admin access required" } }
```

