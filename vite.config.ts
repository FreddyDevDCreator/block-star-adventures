import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Nitro is only needed for production builds (Vercel output).
// In dev, enabling Nitro can break the Vite environment runner with:
// "Vite environment \"nitro\" is unavailable".
export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" ? [nitro({ preset: "vercel" })] : []),
    react(),
  ],
  build: isSsrBuild
    ? {
        rollupOptions: {
          output: {
            // Vercel sometimes omits SSR split chunks from the function bundle.
            // Inlining dynamic imports ensures SSR is self-contained.
            inlineDynamicImports: true,
          },
        },
      }
    : undefined,
}));
