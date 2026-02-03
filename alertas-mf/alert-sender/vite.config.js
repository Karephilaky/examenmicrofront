import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "alert_sender",
      filename: "remoteEntry.js",
      exposes: {
        "./AlertSender": "./src/AlertSender.jsx",
      },
      shared: ["react", "react-dom", "styled-components"],
    }),
  ],
  server: { port: 5174 },
  build: { target: "esnext" },
});
