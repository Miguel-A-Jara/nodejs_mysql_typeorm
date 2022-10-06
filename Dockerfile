# Install dependencies only when needed
FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json .
RUN npm install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5000

CMD ["node", "./build/index.js"]