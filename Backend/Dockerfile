
# Use the official Node.js 17 image with Alpine Linux base
FROM node:17-alpine

# Install dependencies with minimal cache (optional)
RUN apk update && apk upgrade && apk add --no-cache --virtual .build-deps python3 make g++

# Create a non-root user for the application
RUN adduser -S nodeuser

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies as the non-root user
RUN su nodeuser -c 'npm install'

# Copy the rest of the project files
COPY . .


 RUN npm install --save bcryptjs

# Expose port 8000
EXPOSE 8000

# Start the application using npm start
CMD ["npm", "start"]