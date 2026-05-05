import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./PageShell--bjKwccj.mjs";
const mascotPng = "/assets/mascot-DMBzMA1R.png";
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
export {
  Mascot as M
};
