import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        start_url: "/open-7m-workout/",
        description:
          "Minimalist open-source 7 minute workout app built with React and Vite.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "react.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  base: "/open-7m-workout/",
});
