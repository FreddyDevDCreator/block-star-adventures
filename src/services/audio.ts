// Real audio service: Web Speech API for narration + WebAudio for SFX.
// All calls are safe no-ops when the browser APIs are unavailable (e.g. SSR,
// older Android WebView) so no try/catch is needed at the call sites.

// ─── Speech Synthesis ──────────────────────────────────────────────────────

let preferredVoice: SpeechSynthesisVoice | null = null;

// African English locales available on Chrome for Android and some desktop
// Chrome installs. We try these first so the voice sounds familiar to kids
// in Nigeria, Ghana, Kenya, South Africa, Tanzania, Uganda, etc.
const AFRICAN_LOCALES = ["en-NG", "en-GH", "en-KE", "en-ZA", "en-TZ", "en-UG"];

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof speechSynthesis === "undefined") return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferences: Array<(v: SpeechSynthesisVoice) => boolean> = [
    // 1. Any dedicated African-English locale voice
    (v) => AFRICAN_LOCALES.some((loc) => v.lang === loc),
    // 2. Any voice whose lang starts with an African locale prefix
    (v) => AFRICAN_LOCALES.some((loc) => v.lang.startsWith(loc)),
    // 3. British English — the prestige accent familiar across Anglophone Africa
    (v) => v.lang === "en-GB" && /google/i.test(v.name),
    (v) => v.lang === "en-GB",
    // 4. Any other English as last resort
    (v) => v.lang.startsWith("en"),
  ];

  for (const test of preferences) {
    const match = voices.find(test);
    if (match) return match;
  }
  return voices[0] ?? null;
}

export interface SpeakOptions {
  pitch?: number; // default 1.05  — warmer, less robotic
  rate?: number;  // default 0.88  — measured African English cadence
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
  utt.pitch = opts.pitch ?? 1.05;
  utt.rate  = opts.rate  ?? 0.88;
  speechSynthesis.speak(utt);
}

/** Alias kept for backwards-compat with onboarding.tsx */
export function playNarration(text: string): void {
  speak(text);
}

export function stopSpeaking(): void {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
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
    SFX[name]?.();
  } catch {
    // AudioContext blocked before user gesture — silent
  }
}
