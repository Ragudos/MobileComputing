FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# ---- build shared first ----
FROM base AS shared
WORKDIR /app/shared
COPY ../shared ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# ---- now build client (depends on shared) ----
FROM base AS client-deps
WORKDIR /app
COPY . .
# copy built shared into client workspace
COPY --from=shared /app/shared/dist ./shared/dist
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM client-deps AS client-build
RUN pnpm run build

FROM client-deps AS prod-deps
RUN pnpm install --prod --frozen-lockfile

# ---- final image ----
FROM base
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=client-build /app/dist ./dist
EXPOSE 3000
CMD ["pnpm", "start"]
