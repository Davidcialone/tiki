import pkg from "sequelize";
const { Model, DataTypes } = pkg;
import sequelize from "../../db.js";

export class Users extends Model {}

Users.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "customer",
      references: {
        model: "role",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);
