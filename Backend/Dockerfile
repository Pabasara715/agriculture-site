FROM node:17-alpine

RUN apk add --no-cache python3 make g++

RUN npm install -g nodemon

# Install node-pre-gyp globally (less secure)
RUN npm install --global --prefix /usr/local/lib/node_modules node-pre-gyp

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Install bash
RUN apk update && apk add bash

RUN chmod +x wait-for-it.sh

# Create user and change ownership
RUN adduser --disabled-password --shell /bin/sh nodeuser
RUN chown -R nodeuser:nodeuser /app

RUN su nodeuser -c 'npm rebuild bcrypt --build-from-source'

EXPOSE 3001

CMD ["./wait-for-it.sh", "host.docker.internal:3306", "--", "npm", "start"]
