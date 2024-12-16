export {
  Reservations,
  Roles,
  Users,
  Zones,
  MenuItems,
  Categories,
  sequelize,
} from "../models/index.js";

console.log(Users.associations); // Vérifiez les associations de Users
console.log(Reservations.associations); // Vérifiez les associations de Reservations
