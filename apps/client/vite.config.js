import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["sequelize", "pg-hstore"],
  },
  build: {
    outDir: "dist",
    // Ajout de la configuration du build
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Configuration du serveur
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  // Configuration des variables d'environnement
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(
      "https://tiki-ermployee.vercel.app"
    ),
  },
  // Ajout de la résolution des modules
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
