FROM node:17-alpine

RUN apk add --no-cache python3 make g++ && \
    npm install -g nodemon

# Create a non-root user
RUN addgroup -S appgroup && adduser -S -G appgroup appuser

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Change ownership of the /app directory
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Install dependencies
RUN npm install

# Switch back to root user to copy the rest of the application code and perform root-required actions
USER root

COPY . .

RUN apk update && apk add bash

RUN chmod +x wait-for-it.sh

# Switch back to the non-root user to rebuild bcrypt
USER appuser

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3001

CMD ["./wait-for-it.sh", "host.docker.internal:3306", "--", "npm", "start"]
