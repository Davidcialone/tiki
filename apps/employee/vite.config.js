// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [],
  },
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(
      "https://tiki-ermployee.vercel.app"
    ),
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
