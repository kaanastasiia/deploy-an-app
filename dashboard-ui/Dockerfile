ARG IMAGE="node:16-alpine"
FROM $IMAGE AS base
WORKDIR /app
RUN npm install yarn

FROM base AS build
COPY ./ ./
RUN yarn install
RUN npm run build

FROM base AS app
RUN chown node:node /app
COPY --from=build --chown=node:node /app/build ./build
COPY --from=build --chown=node:node /app/src ./src
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build  --chown=node:node /app/public ./public
COPY --from=build  --chown=node:node /app/package.json ./
USER node:node
ENTRYPOINT ["yarn", "start"]
