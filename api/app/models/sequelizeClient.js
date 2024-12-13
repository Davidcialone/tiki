import "dotenv/config"; // require("dotenv/config");

import { Sequelize } from "sequelize"; // const { Sequelize } = require('sequelize');

// Notre client Sequelize
export const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  define: {
    createdAt: "created_at", // rename pour TOUS les modèles (DRY !)
    updatedAt: "updated_at",
  },
  // pour importer, on fera `import { sequelize } from "..."`
  logging: false,
});

sequelize.addHook("beforeSave", (instance) => {
  console.log(instance.dataValues); // Vérifiez si `createdAt` est mentionné.
});

await sequelize.authenticate();
