import { User } from "./User.js";
import { Reservation } from "./Reservation.js";
import { Role } from "./Role.js";
import { Zone } from "./Zone.js";
import { MenuItem } from "./MenuItem.js";
import { Categorie } from "./Categorie.js";
import { sequelize } from "./sequelizeClient.js";

const models = {
  User,
  Role,
  Reservation,
  Zone,
  MenuItem,
  Categorie,
};

// Association Users-Roles
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

// Association Users-Reservations
User.hasMany(Reservation, {
  foreignKey: "user_id",
  as: "userReservations",
});

Reservation.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Association Reservations-Zones
Reservation.belongsTo(Zone, {
  foreignKey: "zone_id",
  as: "reservationZone",
});

Zone.hasMany(Reservation, {
  foreignKey: "zone_id",
  as: "zoneReservations",
});

// Association Categories-MenuItems
MenuItem.belongsTo(Categorie, {
  foreignKey: "category_id",
  as: "category",
});

Categorie.hasMany(MenuItem, {
  foreignKey: "category_id",
  as: "categoryItems",
});

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { User, Reservation, Role, Zone, MenuItem, Categorie, sequelize };
