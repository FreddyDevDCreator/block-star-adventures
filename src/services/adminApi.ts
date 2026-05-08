import { apiFetch } from "@/services/api";

export type AdminRole = "student" | "teacher" | "admin";
export type AgeGroup = "kid" | "teen";

export type AdminUser = {
  id: string;
  name: string;
  role: AdminRole;
  ageGroup?: AgeGroup;
  createdAt: string;
  lastActiveAt?: string;
};

export type AdminUserDetails = AdminUser & {
  progress?: { xp: number; level: number; coins: number };
  badges?: { id: string; title: string; earnedAt: string }[];
};

export type AdminLesson = {
  id: string;
  title: string;
  summary?: string;
  published: boolean;
  difficulty?: "easy" | "medium" | "hard";
  updatedAt: string;
};

export type AdminReward = {
  id: string;
  title: string;
  costCoins: number;
  enabled: boolean;
  updatedAt: string;
};

export type CursorPage<T> = {
  items: T[];
  nextCursor?: string | null;
};

export type AdminSummary = {
  totals: { users: number; lessons: number; rewards: number };
  recentUsers: AdminUser[];
  lessons: AdminLesson[];
  rewards: AdminReward[];
};

export async function getAdminSummary() {
  return await apiFetch<AdminSummary>("/admin/summary");
}

export async function listAdminUsers(params: {
  q?: string;
  role?: AdminRole;
  cursor?: string;
  limit?: number;
}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.role) qs.set("role", params.role);
  if (params.cursor) qs.set("cursor", params.cursor);
  if (params.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs}` : "";
  return await apiFetch<CursorPage<AdminUser>>(`/admin/users${suffix}`);
}

export async function createAdminUser(input: { name: string; role: AdminRole; ageGroup?: AgeGroup }) {
  return await apiFetch<AdminUser>("/admin/users", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getAdminUser(id: string) {
  return await apiFetch<AdminUserDetails>(`/admin/users/${encodeURIComponent(id)}`);
}

export async function updateAdminUser(
  id: string,
  patch: Partial<{ name: string; role: AdminRole; ageGroup?: AgeGroup }>,
) {
  return await apiFetch<AdminUser>(`/admin/users/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function resetAdminUserProgress(id: string) {
  return await apiFetch<{ ok: true }>(`/admin/users/${encodeURIComponent(id)}/reset-progress`, {
    method: "POST",
  });
}

export async function listAdminLessons(params: {
  q?: string;
  published?: boolean;
  cursor?: string;
  limit?: number;
}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.published !== undefined) qs.set("published", String(params.published));
  if (params.cursor) qs.set("cursor", params.cursor);
  if (params.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs}` : "";
  return await apiFetch<CursorPage<AdminLesson>>(`/admin/lessons${suffix}`);
}

export async function createAdminLesson(input: { title: string; summary?: string }) {
  return await apiFetch<AdminLesson>("/admin/lessons", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateAdminLesson(
  id: string,
  patch: Partial<{ title: string; summary?: string; difficulty?: "easy" | "medium" | "hard"; published: boolean }>,
) {
  return await apiFetch<AdminLesson>(`/admin/lessons/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function publishAdminLesson(id: string) {
  return await apiFetch<{ ok: true }>(`/admin/lessons/${encodeURIComponent(id)}/publish`, {
    method: "POST",
  });
}

export async function unpublishAdminLesson(id: string) {
  return await apiFetch<{ ok: true }>(`/admin/lessons/${encodeURIComponent(id)}/unpublish`, {
    method: "POST",
  });
}

export async function deleteAdminLesson(id: string) {
  return await apiFetch<{ ok: true }>(`/admin/lessons/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export async function listAdminRewards(params: {
  q?: string;
  enabled?: boolean;
  cursor?: string;
  limit?: number;
}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.enabled !== undefined) qs.set("enabled", String(params.enabled));
  if (params.cursor) qs.set("cursor", params.cursor);
  if (params.limit) qs.set("limit", String(params.limit));
  const suffix = qs.toString() ? `?${qs}` : "";
  return await apiFetch<CursorPage<AdminReward>>(`/admin/rewards${suffix}`);
}

export async function createAdminReward(input: { title: string; costCoins: number; enabled: boolean }) {
  return await apiFetch<AdminReward>("/admin/rewards", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateAdminReward(
  id: string,
  patch: Partial<{ title: string; costCoins: number; enabled: boolean }>,
) {
  return await apiFetch<AdminReward>(`/admin/rewards/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteAdminReward(id: string) {
  return await apiFetch<{ ok: true }>(`/admin/rewards/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

