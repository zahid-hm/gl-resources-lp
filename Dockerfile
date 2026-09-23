# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time-only values baked into client bundles. Server secrets
# (IPGEO_API_KEY) are NOT needed here — they're read at request time in the
# running container, supplied via docker-compose's env_file.
ARG NEXT_PUBLIC_SITE_URL=https://getlevrg.com
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ARG NEXT_PUBLIC_HUBSPOT_SCRIPT_URL=https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js
ENV NEXT_PUBLIC_HUBSPOT_SCRIPT_URL=${NEXT_PUBLIC_HUBSPOT_SCRIPT_URL}
ARG NEXT_PUBLIC_HUBSPOT_MEETING_URL=https://meetings.hubspot.com/jamie-shanks/book-a-discovery-call-with-get-levrg?embed=true
ENV NEXT_PUBLIC_HUBSPOT_MEETING_URL=${NEXT_PUBLIC_HUBSPOT_MEETING_URL}
ARG NEXT_PUBLIC_THANKYOU_VIDEO_ID=jj7srGIWk08
ENV NEXT_PUBLIC_THANKYOU_VIDEO_ID=${NEXT_PUBLIC_THANKYOU_VIDEO_ID}
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
