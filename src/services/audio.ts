// Stub for future text-to-speech / sound effects. Safe to call from any
// component; intentionally a no-op for now.
export function playNarration(_text: string): void {
  // future: SpeechSynthesisUtterance or audio file
}

export function playSfx(_name: "success" | "click" | "error" | "coin"): void {
  // future: short Audio() playback
}
