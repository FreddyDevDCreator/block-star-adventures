import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as openDB } from "../_libs/idb.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { V as Volume2, h as VolumeX } from "../_libs/lucide-react.mjs";
import { c as create } from "../_libs/zustand.mjs";
const DB_NAME = "codequest";
const STORE = "profile";
let dbPromise = null;
function getDB() {
  if (typeof indexedDB === "undefined") return null;
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      }
    });
  }
  return dbPromise;
}
const defaultProfile = {
  id: "me",
  userId: void 0,
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
  soundOn: true
};
async function loadProfile() {
  const db = await getDB();
  if (!db) return defaultProfile;
  const data = await db.get(STORE, "me");
  if (!data) return defaultProfile;
  const migratedAttempts = Array.isArray(data.attempts) ? data.attempts : [];
  return {
    ...defaultProfile,
    ...data,
    attempts: migratedAttempts,
    soundOn: data.soundOn ?? true
  };
}
async function saveProfile(profile) {
  const db = await getDB();
  if (!db) return;
  await db.put(STORE, profile, "me");
}
async function persistProfilePatch(patch, _options = {}) {
  const profile = { ...await loadProfile(), ...patch };
  await saveProfile(profile);
  return profile;
}
const mascotPng = "/assets/mascot-DMBzMA1R.png";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const sizes = {
  sm: "w-16 h-16",
  md: "w-28 h-28",
  lg: "w-44 h-44",
  xl: "w-64 h-64"
};
function Mascot({ size = "md", className, bob = true }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: mascotPng,
      alt: "Bolt the friendly coding robot",
      width: 768,
      height: 768,
      loading: "lazy",
      className: cn(
        sizes[size],
        "object-contain drop-shadow-[0_8px_20px_rgba(59,130,246,0.35)]",
        bob && "animate-[bob_3s_ease-in-out_infinite]",
        className
      ),
      style: {
        // inline keyframes via tw-animate-css fallback
      }
    }
  );
}
const useSettingsStore = create((set, get) => ({
  soundOn: defaultProfile.soundOn,
  settingsHydrated: false,
  hydrateSettings: async () => {
    const profile = await loadProfile();
    set({ soundOn: profile.soundOn, settingsHydrated: true });
  },
  toggleSound: () => {
    const soundOn = !get().soundOn;
    set({ soundOn });
    void persistProfilePatch({ soundOn });
  }
}));
let preferredVoice = null;
const AFRICAN_LOCALES = ["en-NG", "en-GH", "en-KE", "en-ZA", "en-TZ", "en-UG"];
function looksFemale(v) {
  return /female|woman|girls?|lady/i.test(v.name);
}
function pickVoice() {
  if (typeof speechSynthesis === "undefined") return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  const byLocale = (pred) => pred;
  const byLocaleFemaleFirst = (pred) => [
    (v) => pred(v) && looksFemale(v),
    (v) => pred(v)
  ];
  const preferences = [
    // 1. Nigerian English (prefer female first)
    ...byLocaleFemaleFirst(byLocale((v) => v.lang === "en-NG" || v.lang.startsWith("en-NG"))),
    // 2. Other African English locales (prefer female first)
    ...byLocaleFemaleFirst(
      byLocale((v) => AFRICAN_LOCALES.some((loc) => v.lang === loc || v.lang.startsWith(loc)))
    ),
    // 3. British English — common fallback across Anglophone Africa (prefer female first)
    ...byLocaleFemaleFirst(byLocale((v) => v.lang === "en-GB" && /google/i.test(v.name))),
    ...byLocaleFemaleFirst(byLocale((v) => v.lang === "en-GB")),
    // 4. Any other English as last resort (prefer female first)
    ...byLocaleFemaleFirst(byLocale((v) => v.lang.startsWith("en")))
  ];
  for (const test of preferences) {
    const match = voices.find(test);
    if (match) return match;
  }
  return voices[0] ?? null;
}
function speak(text, opts = {}) {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  if (!text.trim()) return;
  if (!preferredVoice) preferredVoice = pickVoice();
  if (!preferredVoice) {
    speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        preferredVoice = pickVoice();
      },
      { once: true }
    );
  }
  const utt = new SpeechSynthesisUtterance(text);
  utt.voice = preferredVoice;
  utt.lang = preferredVoice?.lang ?? "en-GB";
  utt.pitch = opts.pitch ?? 1.05;
  utt.rate = opts.rate ?? 0.88;
  speechSynthesis.speak(utt);
}
function stopSpeaking() {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
}
let ctx = null;
function getCtx() {
  if (ctx) return ctx;
  if (typeof AudioContext !== "undefined") {
    ctx = new AudioContext();
    return ctx;
  }
  const win = window;
  if (typeof win.webkitAudioContext !== "undefined") {
    ctx = new win.webkitAudioContext();
    return ctx;
  }
  return null;
}
function tone(frequency, duration, type = "sine", gainStart = 0.35, gainEnd = 0, startOffset = 0) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, c.currentTime + startOffset);
  gain.gain.setValueAtTime(gainStart, c.currentTime + startOffset);
  gain.gain.exponentialRampToValueAtTime(
    Math.max(gainEnd, 1e-4),
    c.currentTime + startOffset + duration
  );
  osc.start(c.currentTime + startOffset);
  osc.stop(c.currentTime + startOffset + duration + 0.01);
}
const SFX = {
  success: () => {
    tone(523, 0.12, "sine", 0.3, 0, 0);
    tone(659, 0.12, "sine", 0.3, 0, 0.1);
    tone(784, 0.12, "sine", 0.3, 0, 0.2);
    tone(1047, 0.25, "sine", 0.35, 0, 0.3);
  },
  error: () => {
    tone(320, 0.15, "sawtooth", 0.25, 0, 0);
    tone(280, 0.25, "sawtooth", 0.2, 0, 0.12);
  },
  coin: () => {
    tone(1200, 0.08, "triangle", 0.4, 0, 0);
    tone(1600, 0.15, "triangle", 0.3, 0, 0.06);
  },
  click: () => {
    tone(600, 0.05, "sine", 0.15, 0, 0);
  }
};
function playSfx(name) {
  try {
    SFX[name]?.();
  } catch {
  }
}
function SoundToggle({ className }) {
  const soundOn = useSettingsStore((s) => s.soundOn);
  const toggleSound = useSettingsStore((s) => s.toggleSound);
  const handleClick = () => {
    if (soundOn) stopSpeaking();
    toggleSound();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      id: "sound-toggle",
      onClick: handleClick,
      "aria-label": soundOn ? "Mute sound" : "Unmute sound",
      title: soundOn ? "Mute" : "Unmute",
      className: cn(
        "inline-flex items-center justify-center w-9 h-9 rounded-full",
        "bg-card border-2 border-border shadow-[var(--shadow-soft)]",
        "hover:border-primary transition-colors",
        soundOn ? "text-primary" : "text-muted-foreground",
        className
      ),
      children: soundOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4" })
    }
  );
}
export {
  Mascot as M,
  SoundToggle as S,
  persistProfilePatch as a,
  stopSpeaking as b,
  cn as c,
  defaultProfile as d,
  loadProfile as l,
  playSfx as p,
  speak as s,
  useSettingsStore as u
};
