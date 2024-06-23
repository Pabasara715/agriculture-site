FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.

CMD ["serve", "-s", "build"]

EXPOSE 3000

