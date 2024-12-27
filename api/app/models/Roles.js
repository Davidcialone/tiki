import pkg from "sequelize";
const { Model, DataTypes } = pkg;
import sequelize from "../../db.js";

export class Roles extends Model {}

Roles.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: true,
    createdAt: "created_at", // Map Sequelize `createdAt` to DB `created_at`
    updatedAt: "updated_at", // Map Sequelize `updatedAt` to DB `updated_at`
  }
);
