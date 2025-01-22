import bcrypt from 'bcrypt';

const password = 'Manager1234!';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Erreur lors du hashage:', err);
        return;
    }
    console.log('Mot de passe original:', password);
    console.log('Hash bcrypt:', hash);
});
