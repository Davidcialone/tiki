import bcrypt from "bcrypt";

// Remplacez par le mot de passe en clair que vous voulez vérifier
const plaintextPassword = "Admin1234!";

// Remplacez par le mot de passe haché récupéré de la base
const hashedPassword =
  "$2b$12$6dxA1PZM4hhHEgGJA5Fgo.3G0GN4Lfu6pPzX8Nzv3yjtLaWz0kXw.";

(async () => {
  const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
  console.log("Le mot de passe correspond-il ?", isMatch); // Affiche true ou false
})();
