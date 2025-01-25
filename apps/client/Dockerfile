FROM node:20-alpine

WORKDIR /app

# Copy client package files
COPY apps/client/package*.json ./

# Install dependencies
RUN npm install

# Copy client source files
COPY apps/client/ ./

# Build the client
RUN npm run build

# Install Nginx
RUN apk add --no-cache nginx

# Copy Nginx configuration
COPY apps/client/nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start Nginx with built files
CMD ["nginx", "-g", "daemon off;"]