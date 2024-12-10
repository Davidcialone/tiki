import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: false, // Mettre true pour voir les requêtes SQL dans la console
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5, // nombre maximum de connexions dans le pool
    min: 0, // nombre minimum de connexions dans le pool
    acquire: 30000, // temps maximum, en millisecondes, pour qu'une connexion soit établie
    idle: 10000, // temps maximum, en millisecondes, qu'une connexion peut être inactive avant d'être libérée
  },
});

try {
  await sequelize.authenticate();
  console.log("Connected to the database successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
