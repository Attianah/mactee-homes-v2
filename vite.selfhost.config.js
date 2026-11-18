import { fileURLToPath } from "node:url";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Static build for Vercel / Netlify / any static host.
// It replaces the three Base44-only modules with self-hosted equivalents and
// builds the site as a client-only single page app (no server, no worker).
const srcDir = fileURLToPath(new URL("./src", import.meta.url));
const selfhost = (file) => fileURLToPath(new URL(`./selfhost/${file}`, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: "base44:document", replacement: selfhost("base44-document.js") },
      { find: "cloudflare:workers", replacement: selfhost("cloudflare-workers.js") },
      { find: /^@\/lib\/server-fns$/, replacement: selfhost("data.js") },
      { find: /^@\/lib\/AuthContext$/, replacement: selfhost("auth-context.jsx") },
      { find: "@", replacement: srcDir },
    ],
  },
  plugins: [
    tanstackStart({ srcDirectory: "src", spa: { enabled: true } }),
    react(),
  ],
});