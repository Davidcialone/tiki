import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "customer",
    },
  },
  {
    sequelize,
    tableName: "role",
  }
);
