FROM node:20-alpine

WORKDIR /app

# Copy entire monorepo
COPY . .

# Install dependencies
RUN npm install

# Set working directory to client
WORKDIR /app/apps/employee

# Install client dependencies
RUN npm install

# Build the client
RUN npm run build

# Install Nginx
RUN apk add --no-cache nginx

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]