// Real audio service: Web Speech API for narration + WebAudio for SFX.
// All calls are safe no-ops when the browser APIs are unavailable (e.g. SSR,
// older Android WebView) so no try/catch is needed at the call sites.

import { useSettingsStore } from "@/store/useSettingsStore";

// ─── Speech Synthesis ──────────────────────────────────────────────────────

let preferredVoice: SpeechSynthesisVoice | null = null;

// African English locales available on Chrome for Android and some desktop
// Chrome installs. We try these first so the voice sounds familiar to kids
// in Nigeria, Ghana, Kenya, South Africa, Tanzania, Uganda, etc.
const AFRICAN_LOCALES = ["en-NG", "en-GH", "en-KE", "en-ZA", "en-TZ", "en-UG"];

function looksFemale(v: SpeechSynthesisVoice): boolean {
  // Web Speech doesn't standardize gender; we infer from common voice names.
  // Examples: "Google UK English Female", "Microsoft Ada Online (Natural) - English (Nigeria)"
  return /female|woman|girls?|lady/i.test(v.name);
}

function isAfricanNamedVoice(v: SpeechSynthesisVoice): boolean {
  // Some platforms don't expose African locales via `lang`, but the voice name
  // often contains region info (e.g. "English (Nigeria)").
  return /(nigeria|ghana|kenya|south africa|tanzania|uganda|africa)/i.test(v.name);
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof speechSynthesis === "undefined") return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  const byLocale = (pred: (v: SpeechSynthesisVoice) => boolean) => pred;
  const byLocaleFemaleFirst = (pred: (v: SpeechSynthesisVoice) => boolean) => [
    (v: SpeechSynthesisVoice) => pred(v) && looksFemale(v),
    (v: SpeechSynthesisVoice) => pred(v),
  ];

  const preferences: Array<(v: SpeechSynthesisVoice) => boolean> = [
    // 1. Nigerian English (prefer female first)
    ...byLocaleFemaleFirst(byLocale((v) => v.lang === "en-NG" || v.lang.startsWith("en-NG"))),
    // 1b. Nigerian named voices (prefer female first)
    ...byLocaleFemaleFirst(byLocale((v) => /nigeria/i.test(v.name))),
    // 2. Other African English locales (prefer female first)
    ...byLocaleFemaleFirst(
      byLocale((v) => AFRICAN_LOCALES.some((loc) => v.lang === loc || v.lang.startsWith(loc))),
    ),
    // 2b. Other African named voices (prefer female first)
    ...byLocaleFemaleFirst(byLocale((v) => isAfricanNamedVoice(v))),
    // 3. British English — common fallback across Anglophone Africa (prefer female first)
    ...byLocaleFemaleFirst(byLocale((v) => v.lang === "en-GB" && /google/i.test(v.name))),
    ...byLocaleFemaleFirst(byLocale((v) => v.lang === "en-GB")),
    // 4. Any other English as last resort (prefer female first)
    ...byLocaleFemaleFirst(byLocale((v) => v.lang.startsWith("en"))),
  ];

  for (const test of preferences) {
    const match = voices.find(test);
    if (match) return match;
  }
  return voices[0] ?? null;
}

export interface SpeakOptions {
  pitch?: number; // default 1.05  — warmer, less robotic
  rate?: number; // default 0.88  — measured African English cadence
}

// Many browsers block audio until a user gesture happens. We "unlock" audio
// using a near-silent WebAudio tick during a tap/click, then narration can play.
let audioUnlocked = false;
export async function unlockAudio(): Promise<void> {
  if (audioUnlocked) return;
  const c = getCtx();
  if (!c) return;
  try {
    if (c.state !== "running") await c.resume();
    const osc = c.createOscillator();
    const gain = c.createGain();
    gain.gain.value = 0.00001;
    osc.frequency.value = 220;
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 0.01);
    audioUnlocked = true;
  } catch {
    // ignore
  }
}

export function speak(text: string, opts: SpeakOptions = {}): void {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  if (!text.trim()) return;

  // Voices may load asynchronously on first call.
  if (!preferredVoice) preferredVoice = pickVoice();
  if (!preferredVoice) {
    // Retry once voices have loaded (common on Android Chrome)
    speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        preferredVoice = pickVoice();
      },
      { once: true },
    );
  }

  const utt = new SpeechSynthesisUtterance(text);
  utt.voice = preferredVoice;
  // Use the matched voice's own locale so the engine applies correct prosody;
  // fall back to en-GB (closer to African English than en-US).
  utt.lang = preferredVoice?.lang ?? "en-GB";
  // Slightly lower pitch + slightly faster rate reads less “posh” on many devices.
  utt.pitch = opts.pitch ?? 1.0;
  utt.rate = opts.rate ?? 0.92;
  speechSynthesis.speak(utt);
}

export async function narrate(text: string, opts: SpeakOptions = {}): Promise<void> {
  if (!useSettingsStore.getState().soundOn) return;
  const mode = (import.meta.env.VITE_TTS_MODE || "browser") as "browser" | "remote";
  if (mode === "remote") {
    try {
      const { narrateRemote } = await import("./narration");
      await narrateRemote(text);
      return;
    } catch {
      // Render can sleep/timeout; fall back to browser TTS instead of going silent.
      speak(text, opts);
      return;
    }
  }
  speak(text, opts);
}

/** Alias kept for backwards-compat with onboarding.tsx */
export function playNarration(text: string): void {
  speak(text);
}

export function stopSpeaking(): void {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
}

export async function stopNarration(): Promise<void> {
  const mode = (import.meta.env.VITE_TTS_MODE || "browser") as "browser" | "remote";
  if (mode === "remote") {
    const { stopRemoteNarration } = await import("./narration");
    stopRemoteNarration();
    return;
  }
  stopSpeaking();
}

// ─── WebAudio SFX ──────────────────────────────────────────────────────────

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof AudioContext !== "undefined") {
    ctx = new AudioContext();
    return ctx;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (typeof win.webkitAudioContext !== "undefined") {
    ctx = new win.webkitAudioContext() as AudioContext;
    return ctx;
  }
  return null;
}

function tone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gainStart = 0.35,
  gainEnd = 0,
  startOffset = 0,
): void {
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
    Math.max(gainEnd, 0.0001),
    c.currentTime + startOffset + duration,
  );
  osc.start(c.currentTime + startOffset);
  osc.stop(c.currentTime + startOffset + duration + 0.01);
}

const SFX: Record<"success" | "click" | "error" | "coin", () => void> = {
  success: () => {
    // Ascending major arpeggio: C5 E5 G5 C6
    tone(523, 0.12, "sine", 0.3, 0, 0);
    tone(659, 0.12, "sine", 0.3, 0, 0.1);
    tone(784, 0.12, "sine", 0.3, 0, 0.2);
    tone(1047, 0.25, "sine", 0.35, 0, 0.3);
  },
  error: () => {
    // Descending minor 2nd buzz
    tone(320, 0.15, "sawtooth", 0.25, 0, 0);
    tone(280, 0.25, "sawtooth", 0.2, 0, 0.12);
  },
  coin: () => {
    // Bright triangle ping
    tone(1200, 0.08, "triangle", 0.4, 0, 0);
    tone(1600, 0.15, "triangle", 0.3, 0, 0.06);
  },
  click: () => {
    tone(600, 0.05, "sine", 0.15, 0, 0);
  },
};

export function playSfx(name: "success" | "click" | "error" | "coin"): void {
  try {
    if (!useSettingsStore.getState().soundOn) return;
    SFX[name]?.();
  } catch {
    // AudioContext blocked before user gesture — silent
  }
}
