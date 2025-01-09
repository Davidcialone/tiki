import { Model, DataTypes } from "sequelize";
import sequelize from "../../db.js";

export class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
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
      validate: {
        min: 1,
      },
    },
    note: DataTypes.STRING(255),
    status: {
      type: DataTypes.ENUM("pending", "reserved", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    zone_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Zone",
        key: "id",
      },
    },
    places_used: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Reservation",
    tableName: "Reservation",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Nombre de personnes par table
const PERSONS_PER_TABLE = 2;

// Hook pour calculer end_time avant l'insertion
Reservation.beforeCreate((reservation) => {
  if (!reservation.reservation_time) {
    throw new Error("reservation_time must be defined to calculate end_time");
  }

  const [hours, minutes] = reservation.reservation_time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  date.setMinutes(date.getMinutes() + 90);

  const endHours = date.getHours().toString().padStart(2, "0");
  const endMinutes = date.getMinutes().toString().padStart(2, "0");
  reservation.end_time = `${endHours}:${endMinutes}`;
});

// Hook pour calculer places_used avant l'insertion
Reservation.beforeCreate((reservation) => {
  if (!reservation.number_of_people || reservation.number_of_people <= 0) {
    throw new Error(
      "number_of_people must be greater than 0 to calculate places_used"
    );
  }

  // Calcul des tables nécessaires
  reservation.places_used = Math.ceil(
    reservation.number_of_people / PERSONS_PER_TABLE
  );
});

export default Reservation;
