FROM registry.gitlab.com/tech7684941/shop:${CI_PIPELINE_ID} as prebuild
ARG CI_PIPELINE_ID


FROM node:18.6.0-alpine as release

COPY --from=prebuild /app/api-gateway/dist ./api-gateway/dist
COPY --from=prebuild /app/api-gateway/package*.json ./api-gateway/
COPY --from=prebuild /app/package*.json ./

RUN npm install

CMD ["node" , "api-gateway/dist/api-gateway/src/main"]