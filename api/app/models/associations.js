import { User } from ".User.js";
import { Role } from ".Role.js";
import { Reservations } from ".Reservations.js";
import { sequelize } from "./sequelizeClient.js";

User.belongsTo(Role, {
  foreignKey: "role_id",
});
Role.hasMany(User, {
  foreignKey: "role_id",
});
User.hasMany(Reservations, {
  foreignKey: "user_id",
});
Reservations.belongsTo(User, {
  foreignKey: "user_id",
});

export { User, Role, Reservations, sequelize };
