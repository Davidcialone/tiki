import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Configurer Sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development", // Seul en mode développement
  dialectOptions: {
    ssl: process.env.NODE_ENV === "production" && {
      require: true,
      rejectUnauthorized: false, // Ajuster en fonction de votre environnement
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Tester la connexion
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
})();

export default sequelize;
