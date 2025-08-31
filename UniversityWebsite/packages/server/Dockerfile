# Use Node.js base image
FROM node:20-slim

WORKDIR /app

# Install pnpm globally (if using pnpm)
RUN npm install -g pnpm

# Copy root package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Copy workspaces
COPY apps ./apps
COPY packages ./packages

# Install deps (resolves local workspaces)
RUN pnpm install --frozen-lockfile

# Build the app (adjust to your workspace)
RUN pnpm --filter apps/server build

# Start server
CMD ["pnpm", "--filter", "apps/server", "start"]

