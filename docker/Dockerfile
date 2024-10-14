FROM node:18.6.0-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build


FROM node:18.6.0-alpine as release

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json .

RUN npm install

CMD ["node" , "dist/main.js"]
