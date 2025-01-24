// vite.config.js
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["sequelize", "pg-hstore"],
  },
  define: {
    "process.env.VITE_API_BASE_URL": JSON.stringify(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api`
        : "http://localhost:5000/api"
    ),
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    // Si ton site est servi dans un sous-dossier comme /client/
    base: "/client/", // Met à jour ce chemin selon ta configuration Nginx
  },
});
