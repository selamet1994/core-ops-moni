// @lovable.dev/vite-tanstack-config already includes the following – do NOT add them manually
// or the app will break with duplicate plugins:
//   – tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target)
//   – componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//   – error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Menyesuaikan dengan nama repositori GitHub Anda
    base: '/core-ops-moni/',
    build: {
      // Memaksa output folder statis bernama 'dist'
      outDir: 'dist',
    }
  },
  tanstackStart: {
    // Mematikan SSR (Server-Side Rendering) agar dikompilasi sebagai aplikasi statis biasa (SPA) yang ramah GitHub Pages
    ssr: false,
    server: { entry: "server" },
  },
});
