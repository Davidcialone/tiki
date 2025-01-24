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
RUN mkdir -p /app/apps/client
COPY apps/client/package*.json /app/apps/client/
WORKDIR /app/apps/client
RUN npm install

# Frontend - Employee
RUN mkdir -p /app/apps/employee
COPY apps/employee/package*.json /app/apps/employee/
WORKDIR /app/apps/employee
RUN npm install

# Copier la configuration nginx dans le conteneur
COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port utilisé pour le backend API
EXPOSE 5000

# Expose les ports pour les frontends
EXPOSE 3000
EXPOSE 3001

# Script pour lancer backend, client et employee
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Commande pour démarrer le backend API et lancer les frontends
CMD ["sh", "/app/start.sh"]
