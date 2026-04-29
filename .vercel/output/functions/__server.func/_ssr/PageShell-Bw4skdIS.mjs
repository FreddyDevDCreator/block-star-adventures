import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useSettingsStore, s as stopNarration } from "./router-yaET50bD.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { V as Volume2, h as VolumeX } from "../_libs/lucide-react.mjs";
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
function SoundToggle({ className }) {
  const soundOn = useSettingsStore((s) => s.soundOn);
  const toggleSound = useSettingsStore((s) => s.toggleSound);
  const handleClick = () => {
    if (soundOn) void stopNarration();
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
        "inline-flex items-center justify-center w-10 h-10 rounded-full",
        "bg-card border-2 border-border shadow-[var(--shadow-soft)]",
        "hover:border-primary transition-colors",
        soundOn ? "text-primary" : "text-muted-foreground",
        className
      ),
      children: soundOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-5 h-5" })
    }
  );
}
function AfricanBackdrop({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 opacity-25",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(135deg,oklch(0.65_0.17_240/0.65),oklch(0.78_0.14_200/0.35))]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[repeating-linear-gradient(90deg,oklch(0.65_0.17_240/0.35)_0px,oklch(0.65_0.17_240/0.35)_10px,transparent_10px,transparent_22px)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "absolute inset-0 h-full w-full",
            viewBox: "0 0 400 800",
            preserveAspectRatio: "none",
            children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "polygon",
              {
                points: `${i % 6 * 70 + 10},${i * 45 - 20} ${i % 6 * 70 + 40},${i * 45 - 40} ${i % 6 * 70 + 70},${i * 45 - 20}`,
                fill: "oklch(0.85 0.17 90 / 0.25)"
              },
              i
            ))
          }
        )
      ]
    }
  );
}
function PageShell({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "min-h-dvh relative flex flex-col overflow-y-auto",
        // Keep the page scrollable even on small phones.
        "bg-[image:var(--gradient-sky)]",
        "p-4 sm:p-6 pb-[env(safe-area-inset-bottom)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AfricanBackdrop, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 w-full", children })
      ]
    }
  );
}
export {
  Mascot as M,
  PageShell as P,
  SoundToggle as S,
  cn as c
};
