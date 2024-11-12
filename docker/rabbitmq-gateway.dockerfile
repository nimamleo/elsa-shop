ARG CI_PIPELINE_ID
FROM registry.gitlab.com/tech7684941/shop:${CI_PIPELINE_ID}-rabbitmq as prebuild


FROM node:18.6.0-alpine as release

COPY --from=prebuild /app/rabbitmq-gateway/dist ./rabbitmq-gateway/dist
COPY --from=prebuild /app/rabbitmq-gateway/package*.json ./rabbitmq-gateway/
COPY --from=prebuild /app/package*.json ./

RUN npm install

CMD ["node" , "rabbitmq-gateway/dist/api-gateway/src/main"]
