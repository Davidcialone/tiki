# Renommer le dossier dashBoard en dashboard
Rename-Item -Path "src/components/dashBoard" -NewName "dashboard_temp"
Rename-Item -Path "src/components/dashboard_temp" -NewName "dashboard"

# Corriger le nom du fichier planningPage
Rename-Item -Path "src/components/dashboard/worker/plannigPage.jsx" -NewName "planningPage.jsx"

Write-Host "Dossiers renommés avec succès!"
