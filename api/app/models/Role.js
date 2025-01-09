import pkg from "sequelize";
const { Model, DataTypes } = pkg;
import { sequelize } from "./sequelizeClient.js";

export class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Role",
    timestamps: true,
    createdAt: "created_at", // Map Sequelize `createdAt` to DB `created_at`
    updatedAt: "updated_at", // Map Sequelize `updatedAt` to DB `updated_at`
  }
);
