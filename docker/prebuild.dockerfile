FROM node:18.6.0-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build


