import { Model, DataTypes } from "sequelize";
import sequelize from "../../db.js";

export class Categorie extends Model {}

Categorie.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Categorie",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
