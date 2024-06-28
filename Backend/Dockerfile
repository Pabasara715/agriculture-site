FROM node:17-alpine

RUN apk add --no-cache python3 make g++

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk update && apk add bash

RUN chmod +x wait-for-it.sh

RUN adduser --disabled-password --shell /bin/sh nodeuser  # Create user (less secure)
RUN chown -R nodeuser:nodeuser /app  # Change ownership of /app directory


RUN su nodeuser -c 'npm rebuild bcrypt --build-from-source'  # Rebuild using nodeuser

EXPOSE 3001

CMD ["./wait-for-it.sh", "host.docker.internal:3306", "--", "npm", "start"]
