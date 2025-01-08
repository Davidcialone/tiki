import { Model, DataTypes } from "sequelize";
import sequelize from "../../db.js";

export class MenuItems extends Model {}

MenuItems.init(
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
        model: "categories",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "menu_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
