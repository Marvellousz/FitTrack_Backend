# Use Node.js base image
FROM node:20-alpine

# Install git for potential dependencies from git repositories
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the backend port
EXPOSE 4000

# Start the backend application
CMD ["npm", "start"]
