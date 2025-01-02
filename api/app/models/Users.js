import pkg from "sequelize";
const { Model, DataTypes } = pkg;
import sequelize from "../../db.js";

export class Users extends Model {}

Users.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validation pour s'assurer que l'email a un format valide
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
      allowNull: true, // Permettre un téléphone manquant
      validate: {
        is: /^[0-9]{10}$/, // Validation pour un numéro de téléphone français de 10 chiffres
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Le mot de passe est requis
      validate: {
        len: [8, 255], // Validation pour s'assurer que le mot de passe a au moins 8 caractères
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Si vous avez une table "Roles", vous pourriez vouloir ajouter une association ici
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
