// useSpeak — auto-speaks text whenever it changes, respecting the global
// soundOn preference from the Zustand store.
// Usage: useSpeak(text)  — speaks whenever `text` changes.
//        useSpeak(text, false)  — opt-out (e.g. during animation).
import { useEffect } from "react";
import { speak, stopSpeaking } from "@/services/audio";
import { useGameStore } from "@/store/useGameStore";

export function useSpeak(text: string, enabled = true): void {
  const soundOn = useGameStore((s) => s.soundOn);

  useEffect(() => {
    if (!enabled || !soundOn || !text.trim()) return;
    speak(text);
    return () => {
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, enabled, soundOn]);
}
