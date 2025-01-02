import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["sequelize", "pg-hstore"],
    include: ["react-datepicker"],
  },
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(
      "https://tiki-ermployee.vercel.app"
    ),
  },
});
