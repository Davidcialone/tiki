import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Configuration de la connexion Sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development", // Logs uniquement en développement
  dialectOptions: {
    ssl: process.env.NODE_ENV === "production" && {
      require: true,
      rejectUnauthorized: false, // Ajustez selon les besoins
    },
  },
  pool: {
    max: 5, // Connexions maximum dans le pool
    min: 0, // Connexions minimum
    acquire: 30000, // Timeout pour l'acquisition
    idle: 10000, // Timeout pour une connexion inactive
  },
});

// Test de connexion
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
})();

export default sequelize;
