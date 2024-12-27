// // Importation des modèles et associations
// import { Users } from "./Users.js";
// import { Reservations } from "./Reservations.js";
// import { Roles } from "./Roles.js";
// import { Zones } from "./Zones.js";
// import { MenuItems } from "./MenuItems.js";
// import { Categories } from "./Categories.js";
// import sequelize from "../../db.js";

// // Importation des associations configurées
// import { setupAssociations } from "./associations.js";

// // Configurer les associations après que les modèles sont importés
// setupAssociations();

// // Exporter les modèles et sequelize
// export { Users, Reservations, Roles, Zones, MenuItems, Categories, sequelize };

// // Vérification des associations dans les modèles
// console.log(Users.associations); // Vérifiez les associations de Users
// console.log(Reservations.associations); // Vérifiez les associations de Reservations

import { Users } from "./Users.js";
import { Reservations } from "./Reservations.js";
import { Roles } from "./Roles.js";
import { Zones } from "./Zones.js";
import { MenuItems } from "./MenuItems.js";
import { Categories } from "./Categories.js";
import sequelize from "../../db.js";

const models = {
  Users,
  Roles,
  Reservations,
  Zones,
  MenuItems,
  Categories,
};

// Association Users-Roles
Users.belongsTo(Roles, {
  foreignKey: "role_id",
  as: "role",
});

Roles.hasMany(Users, {
  foreignKey: "role_id",
  as: "users",
});

// Association Users-Reservations
Users.hasMany(Reservations, {
  foreignKey: "user_id",
  as: "userReservations",
});

Reservations.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// Association Reservations-Zones
Reservations.belongsTo(Zones, {
  foreignKey: "zone_id",
  as: "reservationZone",
});

Zones.hasMany(Reservations, {
  foreignKey: "zone_id",
  as: "zoneReservations",
});

// Association Categories-MenuItems
MenuItems.belongsTo(Categories, {
  foreignKey: "category_id",
  as: "category",
});

Categories.hasMany(MenuItems, {
  foreignKey: "category_id",
  as: "categoryItems",
});

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { Users, Reservations, Roles, Zones, MenuItems, Categories, sequelize };
