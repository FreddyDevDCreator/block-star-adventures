import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as cn, u as useSettingsStore, s as speak, b as stopSpeaking } from "./SoundToggle-1U5H3jKo.mjs";
function useSpeak(text, enabled = true) {
  const soundOn = useSettingsStore((s) => s.soundOn);
  reactExports.useEffect(() => {
    if (!enabled || !soundOn || !text.trim()) return;
    speak(text);
    return () => {
      stopSpeaking();
    };
  }, [text, enabled, soundOn]);
}
function childrenToString(children) {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToString).join(" ");
  if (children !== null && typeof children === "object" && "props" in children) {
    const el = children;
    return childrenToString(el.props.children);
  }
  return "";
}
function SpeechBubble({ children, className, arrow = "left", speak: speak2 = false }) {
  const text = speak2 ? childrenToString(children) : "";
  useSpeak(text, speak2);
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
