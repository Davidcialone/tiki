import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Reservations extends Model {}

Reservations.init(
  {
    reservation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true, // Vérifie si c'est une date valide
      },
    },
    reservation_time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):([0-5]\d)$/, // HH:mm
      },
    },
    number_of_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
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
      beforeValidate: (reservation) => {
        if (reservation.reservation_time) {
          try {
            // Décomposer l'heure `reservation_time`
            const [hours, minutes] = reservation.reservation_time
              .split(":")
              .map(Number);

            // Construire une date fictive pour le calcul
            const reservationDateTime = new Date();
            reservationDateTime.setHours(hours);
            reservationDateTime.setMinutes(minutes);

            // Ajouter 90 minutes pour calculer `end_time`
            reservationDateTime.setMinutes(
              reservationDateTime.getMinutes() + 90
            );

            // Mettre à jour `end_time` en format HH:mm:ss
            const formattedEndTime = reservationDateTime
              .toTimeString()
              .split(" ")[0];
            reservation.end_time = formattedEndTime;
          } catch (error) {
            throw new Error("Erreur lors du calcul de l'heure de fin.");
          }
        }
      },
    },
  }
);
