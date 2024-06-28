FROM node:17-alpine

RUN apk update && apk upgrade && apk add --no-cache --virtual .build-deps python3 make g++

RUN adduser --disabled-password --shell /bin/sh nodeuser

WORKDIR /app

COPY package.json ./

RUN su nodeuser -c 'npm install'

COPY . .

RUN su -c 'npm rebuild bcrypt --build-from-source'

EXPOSE 8000

CMD ["npm", "start"]