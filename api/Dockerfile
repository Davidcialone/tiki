FROM node:20-alpine

WORKDIR /app

# Copy only the API package files first
COPY api/package*.json ./

# Install dependencies
RUN npm install

# Copy API source files
COPY api/ ./

# Build the API
RUN npm run build

# Expose the API port
EXPOSE 3000

# Start the API
CMD ["npm", "start"]