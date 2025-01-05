import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Reservations extends Model {}

Reservations.init(
  {
    reservation_date: {
      type: DataTypes.DATEONLY,
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
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    zone_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "zones",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "reservations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeSave: (reservation) => {
        if (reservation.reservation_time) {
          // Décomposer `reservation_time` (HH:mm)
          const [hours, minutes] = reservation.reservation_time
            .split(":")
            .map(Number);

          // Créer un objet Date pour manipulation
          const reservationDateTime = new Date();
          reservationDateTime.setHours(hours);
          reservationDateTime.setMinutes(minutes);

          // Ajouter 90 minutes
          reservationDateTime.setMinutes(reservationDateTime.getMinutes() + 90);

          // Convertir en format TIME (HH:mm:ss)
          const formattedEndTime = reservationDateTime
            .toTimeString()
            .split(" ")[0];
          reservation.end_time = formattedEndTime;
        }
      },
    },
  }
);
