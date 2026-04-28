// useSpeak — auto-speaks text whenever it changes, respecting the global
// soundOn preference from useSettingsStore (Step 2 of architecture refactor).
// Usage: useSpeak(text)  — speaks whenever `text` changes.
//        useSpeak(text, false)  — opt-out (e.g. during animation).
import { useEffect } from "react";
import { speak, stopSpeaking } from "@/services/audio";
import { useSettingsStore } from "@/store/useSettingsStore";

export function useSpeak(text: string, enabled = true): void {
  const soundOn = useSettingsStore((s) => s.soundOn);

  useEffect(() => {
    if (!enabled || !soundOn || !text.trim()) return;
    speak(text);
    return () => {
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, enabled, soundOn]);
}
