// Mock API. Simulates latency so swapping for a real backend later is a
// one-file change.
import type { UserProfile } from "./db";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function syncProgress(profile: UserProfile): Promise<{ ok: true }> {
  await delay(120);
  return { ok: true };
}

export async function fetchLessonManifest(): Promise<{ version: string }> {
  await delay(80);
  return { version: "1.0.0" };
}

// Use same-origin by default (pairs with Vercel/Vite proxy for /api).
export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export class ApiError extends Error {
  status: number;
  statusText: string;
  body: unknown;

  constructor(opts: { status: number; statusText: string; body: unknown; message?: string }) {
    super(opts.message || `API error: ${opts.status}`);
    this.name = "ApiError";
    this.status = opts.status;
    this.statusText = opts.statusText;
    this.body = opts.body;
  }
}

const AUTH_TOKEN_STORAGE_KEY = "bsa_auth_token";

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (!token) window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  else window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    // allow cookie-based auth if backend uses cookies
    credentials: options.credentials ?? "include",
    ...options,
  });

  if (!res.ok) {
    let body: unknown = undefined;
    const contentType = res.headers.get("content-type") || "";
    try {
      if (contentType.includes("application/json")) {
        body = await res.json();
      } else {
        body = await res.text();
      }
    } catch {
      body = undefined;
    }
    const msg =
      typeof body === "string" && body.trim()
        ? body
        : typeof body === "object" && body && "error" in (body as any)
          ? String((body as any).error?.message ?? res.statusText ?? res.status)
          : res.statusText || `HTTP ${res.status}`;
    throw new ApiError({ status: res.status, statusText: res.statusText, body, message: msg });
  }

  // Allow empty responses for endpoints that return 204 or no body.
  if (res.status === 204) return undefined as T;
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return (await res.text()) as T;
  return (await res.json()) as T;
}

export function isAdminEnabled() {
  return import.meta.env.VITE_ADMIN_ENABLED === "true";
}
