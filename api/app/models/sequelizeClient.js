import "dotenv/config"; // require("dotenv/config");

import { Sequelize } from "sequelize"; // const { Sequelize } = require('sequelize');

// Notre client Sequelize
export const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  // pour importer, on fera `import { sequelize } from "..."`
  define: {
    createdAt: "created_at", // rename pour TOUS les modèles (DRY !)
    updatedAt: "updated_at",
  },
  logging: false,
});

await sequelize.authenticate();
