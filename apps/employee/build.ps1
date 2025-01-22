# Nettoyer le dossier dist
if (Test-Path dist) {
    Remove-Item -Recurse -Force dist
}

# Installer les dépendances
npm install

# Build
npm run build
