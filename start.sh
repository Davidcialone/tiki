#!/bin/bash

# Backend API
cd /app/api && npm run start:api &

# Frontend Client
cd /app/apps/client && npm run start:client &

# Frontend Employee
cd /app/apps/employee && npm run start:employee &

# Attendre que tous les processus en arrière-plan soient terminés (si besoin)
wait
