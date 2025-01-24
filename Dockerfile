# Utiliser une image Node.js 20 comme base
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Backend
COPY api/package*.json ./api/
COPY api/ ./api/
WORKDIR /app/api
RUN npm install

# Frontend - Client
COPY apps/client/package*.json /app/apps/client/
WORKDIR /app/apps/client
RUN npm install
RUN npm run build  # Construire l'application front-end client

# Frontend - Employee
COPY apps/employee/package*.json /app/apps/employee/
WORKDIR /app/apps/employee
RUN npm install
RUN npm run build  # Construire l'application front-end employee

# Copie des fichiers .env dans leurs dossiers respectifs (si nécessaire)
# COPY api/.env ./api/
# COPY apps/client/.env ./apps/client/
# COPY apps/employee/.env ./apps/employee/

# Expose le port utilisé pour l'API
EXPOSE 5000

# Nginx - Configuration
# Copier la configuration nginx dans le conteneur
COPY nginx.conf /etc/nginx/nginx.conf

# Expose les ports pour les frontends
EXPOSE 80

# Lancer Nginx pour servir les fichiers
CMD ["nginx", "-g", "daemon off;"]
