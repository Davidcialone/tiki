import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["sequelize", "pg-hstore"],
  },
  resolve: {
    alias: {
      // Si vous ne souhaitez pas utiliser d'alias, vous pouvez laisser cette section vide
      // sinon vous pouvez ajouter des alias ici, ex : '@': path.resolve(__dirname, 'src')
    },
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom"], // Si vous ne voulez pas inclure react et react-dom dans le bundle
    },
  },
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target: "https://tiki-ew5j.onrender.com", // Assurez-vous que ce backend est accessible
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(
      "https://tiki-ermployee.vercel.app" // URL de l'API pour l'environnement de production
    ),
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
