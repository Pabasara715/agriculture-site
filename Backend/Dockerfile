FROM node:17-alpine

RUN apk add --no-cache python3 make g++

RUN npm install -g nodemon

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3001

CMD ["npm", "start"]

