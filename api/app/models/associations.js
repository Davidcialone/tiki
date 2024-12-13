// Dans un fichier d'associations, par exemple associationsConfig.js
import { Users } from "./Users.js";
import { Reservations } from "./Reservations.js";
import { Roles } from "./Roles.js";
import { Zones } from "./Zones.js";

// Définissez toutes vos associations ici
export const setupAssociations = () => {
  // Associations Users-Roles
  Users.belongsTo(Roles, {
    foreignKey: "role_id",
    as: "role",
  });
  Roles.hasMany(Users, {
    foreignKey: "role_id",
  });

  // Associations Users-Reservations
  Users.hasMany(Reservations, {
    foreignKey: "user_id",
    as: "reservations",
  });
  Reservations.belongsTo(Users, {
    foreignKey: "user_id",
    as: "user",
  });

  // Associations Reservations-Zones
  Reservations.belongsTo(Zones, {
    foreignKey: "zone_id",
    as: "zone",
  });
  Zones.hasMany(Reservations, {
    foreignKey: "zone_id",
  });
};

// Appelez cette fonction après l'initialisation de Sequelize
setupAssociations();
