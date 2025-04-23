FROM node:22-alpine3.21

WORKDIR /usr/src/server

COPY package*.json .

RUN npm install

COPY . .
