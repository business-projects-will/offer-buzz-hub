import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { securityHeaders } from "./src/lib/security-headers";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      routeRules: {
        "/**": { headers: securityHeaders },
      },
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
