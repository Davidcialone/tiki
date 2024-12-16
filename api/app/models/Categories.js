import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Categories extends Model {}

Categories.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
