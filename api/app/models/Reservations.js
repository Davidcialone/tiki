import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Reservations extends Model {}

Reservations.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    reservation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reservation_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    number_of_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    places_used: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isMultipleOfTwo(value) {
          if (value % 2 !== 0) {
            throw new Error("places_used must be a multiple of 2");
          }
        },
      },
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        isAfter(value) {
          if (value <= this.reservation_time) {
            throw new Error("end_time must be after reservation_time");
          }
        },
      },
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "reservations",
  }
);
