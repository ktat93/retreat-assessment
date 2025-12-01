FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/ ./apps/api/
COPY packages/ ./packages/

RUN pnpm config set enable-pre-post-scripts true && \
    pnpm install --frozen-lockfile

WORKDIR /app/apps/api
RUN pnpm prisma generate

RUN pnpm build
EXPOSE 4000

CMD ["node", "dist/src/main.js"]
