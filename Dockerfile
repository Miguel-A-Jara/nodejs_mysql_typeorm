FROM node:16-alpine AS builder

WORKDIR /my-node-app/

COPY package*.json .

RUN npm install

COPY . .

RUN npm build

EXPOSE 5000

CMD [ "npm", "start" ]