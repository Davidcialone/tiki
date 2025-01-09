import pkg from "sequelize";
const { Model, DataTypes } = pkg;
import { sequelize } from "./sequelizeClient.js";

export class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validation pour un format email valide
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, // Numéro de téléphone optionnel
      validate: {
        is: {
          args: /^[0-9]{10}$/,
          msg: "Le numéro de téléphone doit comporter 10 chiffres.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: "Le mot de passe doit comporter entre 8 et 255 caractères.",
        },
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Si vous avez une table "roles", vous pouvez configurer une association dans un autre fichier
      // Exemple : User.belongsTo(Role, { foreignKey: "role_id" });
    },
  },
  {
    sequelize,
    tableName: "User", // Assurez-vous que ce nom correspond à votre base de données
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Exporter également le modèle pour d'autres fichiers
export default User;
