FROM node:20.10-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager

COPY ./prisma  ./prisma
COPY .env.production.sample .env
RUN yarn add prisma
RUN yarn add npm-run-all
RUN yarn add ts-node

COPY package.json ./

FROM deps AS runner
WORKDIR /app

ENV NODE_ENV production

CMD ["yarn","migrate"]
