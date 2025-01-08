import { Model, DataTypes } from "sequelize";
import sequelize from "../../db.js";

export class Reservations extends Model {}

Reservations.init(
  {
    reservation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    reservation_time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
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
    zone_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "zones",
        key: "id",
      },
      onDelete: "SET NULL",
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
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "reservations",
    schema: "public",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

    getterMethods: {
      places_used() {
        // Si le nombre de personnes est pair, on retourne le même nombre
        // Sinon, on retourne +1
        return this.number_of_people % 2 === 0
          ? this.number_of_people
          : this.number_of_people + 1;
      },
      end_time() {
        // Ajoute 1h30 à reservation_time
        const [hours, minutes] = this.reservation_time.split(":").map(Number);
        let newHours = hours + 1; // Ajout de 1 heure
        let newMinutes = minutes + 30; // Ajout de 30 minutes

        if (newMinutes >= 60) {
          newMinutes -= 60;
          newHours += 1;
        }

        // Gestion du format HH:MM
        const formattedHours = String(newHours).padStart(2, "0");
        const formattedMinutes = String(newMinutes).padStart(2, "0");

        return `${formattedHours}:${formattedMinutes}`;
      },
    },
  }
);

export default Reservations;
