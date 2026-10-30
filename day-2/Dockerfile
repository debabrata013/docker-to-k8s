FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm ci --omit=dev

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD [ "node", "index.js" ]