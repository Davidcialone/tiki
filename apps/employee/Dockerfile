FROM node:20-alpine

WORKDIR /app

# Copy employee package files
COPY apps/employee/package*.json ./

# Install dependencies
RUN npm install

# Copy employee source files
COPY apps/employee/ ./

# Build the employee app
RUN npm run build

# Install Nginx
RUN apk add --no-cache nginx

# Copy Nginx configuration
COPY apps/employee/nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start Nginx with built files
CMD ["nginx", "-g", "daemon off;"]