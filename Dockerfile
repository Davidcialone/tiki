# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install global dependencies
RUN npm install -g vite

# Copy package files
COPY package*.json ./
COPY api/package*.json ./api/
COPY apps/client/package*.json ./apps/client/
COPY apps/employee/package*.json ./apps/employee/

# Install dependencies
RUN npm install
RUN npm install --prefix api
RUN npm install --prefix apps/client
RUN npm install --prefix apps/employee

# Copy project files
COPY api/ ./api/
COPY apps/client/ ./apps/client/
COPY apps/employee/ ./apps/employee/

# Build projects
RUN npm run build:client
RUN npm run build:api
RUN npm run build:employee

# Install Nginx
RUN apk add --no-cache nginx

# Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]