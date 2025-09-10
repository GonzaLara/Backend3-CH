# instalar dependencias
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# runtime
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# se copia node_modules y el codigo fuente
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# seguridad: usuario no root provisto por la imagen oficial
USER node

# puerto expuesto por la app
EXPOSE 4000

# comando de arranque
CMD ["node", "src/server.js"]