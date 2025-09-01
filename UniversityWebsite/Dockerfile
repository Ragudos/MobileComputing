FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build

COPY package.json .
COPY pnpm-*.yaml .
COPY packages/shared/package.json packages/shared/package.json
COPY packages/server/package.json packages/server/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

COPY packages/shared/tsconfig.json packages/shared/tsconfig.json
COPY packages/server/tsconfig.json packages/server/tsconfig.json
COPY packages/server/esbuild.config.js packages/server/esbuild.config.js
COPY packages/shared/src packages/shared/src
COPY packages/server/src packages/server/src

RUN pnpm build --filter=shared
RUN pnpm build --filter=server

FROM base AS app1
COPY --from=build / /
WORKDIR /
EXPOSE 3000
CMD [ "pnpm", "run", "start:server" ]
