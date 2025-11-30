# ----- DEPENDENCIES STAGE -----
FROM node:24-alpine AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci --only=production --legacy-peer-deps --ignore-scripts; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ----- BUILD STAGE -----
FROM node:24-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies) without running postinstall scripts
RUN npm ci --ignore-scripts --legacy-peer-deps

# Copy source code
COPY . .

# Install Sanity Studio dependencies
WORKDIR /app/sanity-studio
RUN npm ci --ignore-scripts --legacy-peer-deps

# Return to app root
WORKDIR /app

# Accept build arguments for Next.js public env vars
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_SANITY_API_VERSION

# Set NODE_ENV for build optimization
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Set public environment variables for build (Next.js embeds these at build time)
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SANITY_DATASET="production"
ENV NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
# Build application
RUN npm run build

# ----- PRODUCTION STAGE -----
FROM node:24-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy public assets
COPY --from=builder /app/public ./public

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy production dependencies
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3007

ENV PORT=3007

# Start the application using standalone server
CMD ["node", "server.js"]
    