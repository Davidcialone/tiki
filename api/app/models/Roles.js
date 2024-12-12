import pkg from "sequelize";
const { Model, DataTypes } = pkg;
import sequelize from "../../db.js";

export class Roles extends Model {}

Roles.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "customer",
    },
  },
  {
    sequelize,
    tableName: "roles",
  }
);
