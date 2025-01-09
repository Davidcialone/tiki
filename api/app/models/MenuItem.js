import { Model, DataTypes } from "sequelize";
import sequelize from "../../db.js";

export class MenuItem extends Model {}

MenuItem.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categorie",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "menuItem",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
