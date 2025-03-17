ARG IMAGE="node:20-alpine"
FROM $IMAGE AS base
WORKDIR /app
RUN chown node:node /app
RUN apk add --no-cache curl

FROM base AS build
COPY ./ ./
RUN npm ci
RUN npm run build

FROM base AS app
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build  --chown=node:node /app/package.json ./
USER node:node
ENTRYPOINT ["npm", "run", "start:prod"]
