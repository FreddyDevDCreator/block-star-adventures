import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as cn } from "./PageShell-Bw4skdIS.mjs";
import { u as useSettingsStore, n as narrate, s as stopNarration } from "./router-yaET50bD.mjs";
function useSpeak(text, enabled = true) {
  const soundOn = useSettingsStore((s) => s.soundOn);
  reactExports.useEffect(() => {
    if (!enabled || !soundOn || !text.trim()) return;
    void narrate(text);
    return () => {
      void stopNarration();
    };
  }, [text, enabled, soundOn]);
}
function SpeechBubble({
  children,
  className,
  arrow = "left",
  speak = false,
  speakText
}) {
  useSpeak(speakText ?? "", speak);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "relative rounded-3xl bg-card text-card-foreground px-5 py-4 shadow-[var(--shadow-soft)] border-2 border-primary/20 animate-fade-in",
        className
      ),
      children: [
        children,
        arrow === "left" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-3 top-6 w-6 h-6 rotate-45 bg-card border-l-2 border-b-2 border-primary/20 pointer-events-none" }),
        arrow === "bottom" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-8 -bottom-3 w-6 h-6 rotate-45 bg-card border-r-2 border-b-2 border-primary/20 pointer-events-none" })
      ]
    }
  );
}
export {
  SpeechBubble as S
};
