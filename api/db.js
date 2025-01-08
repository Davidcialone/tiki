import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: ".env.production" });
console.log("PG_URL from .env.production:", process.env.PG_URL);

// Configurer Sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development",
  dialectOptions: {
    ssl: process.env.NODE_ENV === "production" && {
      require: true,
      rejectUnauthorized: false,
      // Ajuster en fonction de votre environnement
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize; // Exportation par défaut du sequelize
