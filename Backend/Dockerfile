FROM node:17-alpine

RUN apk add --no-cache python3 make g++

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install --save bcryptjs 

COPY . .

# Install bash (optional)
RUN apk update && apk add bash

RUN chmod +x wait-for-it.sh

EXPOSE 3001

CMD ["./wait-for-it.sh", "host.docker.internal:3306", "--", "npm", "start"]