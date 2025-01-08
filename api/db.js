import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development", // Active les logs en mode dev
  dialectOptions: {
    ssl: process.env.NODE_ENV === "production" && {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize; // Export par défaut
