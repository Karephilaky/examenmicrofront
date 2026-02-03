import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "alert_dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./AlertDashboard": "./src/AlertDashboard.jsx",
      },
      shared: ["react", "react-dom", "styled-components"],
    }),
  ],
  server: { port: 5175 },
  build: { target: "esnext" },
});
