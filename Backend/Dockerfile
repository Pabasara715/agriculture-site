FROM node:17-alpine

RUN apk add --no-cache python3 make g++ && \
    npm install -g nodemon

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./

# Install dependencies as non-root user
RUN chown -R appuser:appgroup /app && \
    su appuser -c "npm install"

COPY . .

RUN apk update && apk add bash

RUN chmod +x wait-for-it.sh

# Rebuild bcrypt as non-root user
RUN chown -R appuser:appgroup /app && \
    su appuser -c "npm rebuild bcrypt --build-from-source"

EXPOSE 3001

CMD ["./wait-for-it.sh", "host.docker.internal:3306", "--", "npm", "start"]
