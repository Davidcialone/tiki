// import { Users } from "./Users.js";
// import { Reservations } from "./Reservations.js";
// import { Roles } from "./Roles.js";
// import { Zones } from "./Zones.js";
// import { MenuItems } from "./MenuItems.js";
// import { Categories } from "./Categories.js";

// export const setupAssociations = () => {
//   // Association Users-Roles
//   Users.belongsTo(Roles, {
//     foreignKey: "role_id",
//     as: "role", // Changé de "userRole" à "role"
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
//   });

//   Roles.hasMany(Users, {
//     foreignKey: "role_id",
//     as: "users", // Changé de "roleUsers" à "users"
//   });

//   // Le reste des associations reste inchangé
//   Users.hasMany(Reservations, {
//     foreignKey: "user_id",
//     as: "userReservations",
//   });

//   Reservations.belongsTo(Users, {
//     foreignKey: "user_id",
//     as: "user",
//   });

//   Reservations.belongsTo(Zones, {
//     foreignKey: "zone_id",
//     as: "reservationZone",
//   });

//   Zones.hasMany(Reservations, {
//     foreignKey: "zone_id",
//     as: "zoneReservations",
//   });

//   MenuItems.belongsTo(Categories, {
//     foreignKey: "category_id",
//     as: "category",
//   });

//   Categories.hasMany(MenuItems, {
//     foreignKey: "category_id",
//     as: "categoryItems",
//   });
// };
