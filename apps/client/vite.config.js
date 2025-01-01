import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["sequelize", "pg-hstore"],
  },
  build: {
    rollupOptions: {
      external: ["react-datepicker/dist/react-datepicker.css"],
    },
  },
});
