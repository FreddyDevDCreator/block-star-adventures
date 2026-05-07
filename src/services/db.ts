// IndexedDB wrapper using idb. Stores user profile and progress so the app
// works offline and survives reloads.
import { openDB, type IDBPDatabase } from "idb";

export interface UserProfile {
  id: "me";
  userId?: string;
  name: string;
  avatar: string;
  ageGroup: "kid" | "teen";
  level: number;
  xp: number;
  coins: number;
  badges: string[];
  completedScenes: string[]; // "lessonId:sceneIndex"
  completedChallenges: string[];
  attempts: Attempt[];
  onboarded: boolean;
  soundOn: boolean;
}

export type Attempt = {
  id: string;
  challengeId: string;
  type?: "grid" | "quiz";
  success: boolean;
  timeTaken: number; // ms
  movesUsed: number; // blocks/steps executed
  createdAt: number; // timestamp
  synced?: boolean;
  answer?: unknown;
};

const DB_NAME = "codequest";
const STORE = "profile";

let dbPromise: Promise<IDBPDatabase> | null = null;
function getDB() {
  if (typeof indexedDB === "undefined") return null;
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      },
    });
  }
  return dbPromise;
}

export const defaultProfile: UserProfile = {
  id: "me",
  userId: undefined,
  name: "Explorer",
  avatar: "rocket",
  ageGroup: "kid",
  level: 1,
  xp: 0,
  coins: 0,
  badges: [],
  completedScenes: [],
  completedChallenges: [],
  attempts: [],
  onboarded: false,
  soundOn: true,
};

export async function loadProfile(): Promise<UserProfile> {
  const db = await getDB();
  if (!db) return defaultProfile;
  const data = (await db.get(STORE, "me")) as UserProfile | undefined;
  if (!data) return defaultProfile;
  // Back-compat: older profiles may be missing newer fields.
  // Also migrate older `attempts` formats into the new append-only Attempt[] log.
  const migratedAttemptsRaw = (data as { attempts?: unknown }).attempts;
  const migratedAttempts = Array.isArray(migratedAttemptsRaw)
    ? (migratedAttemptsRaw as Attempt[])
    : [];
  return {
    ...defaultProfile,
    ...data,
    attempts: migratedAttempts,
    soundOn: data.soundOn ?? true,
  };
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  const db = await getDB();
  if (!db) return;
  await db.put(STORE, profile, "me");
}
