import pkg from "sequelize";
const { Model, DataTypes } = pkg;
import { sequelize } from "./sequelizeClient.js";

export class Zone extends Model {}
Zone.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Zone",
    timestamps: true,
    createdAt: "created_at", // Map Sequelize `createdAt` to DB `created_at`
    updatedAt: "updated_at", // Map Sequelize `updatedAt` to DB `updated_at`
  }
);
