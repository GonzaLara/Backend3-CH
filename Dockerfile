# ---------- 1: instalar dependencias (solo prod) ----------
FROM node:22-alpine AS deps
WORKDIR /app

# Instalar solo dependencias de produccion de forma reproducible
COPY package*.json ./
# Cache para npm y asegurar lockfile reproducible
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# ---------- 2: runtime ----------
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copiamos node_modules ya resuelto y el codigo fuente
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Seguridad: usar usuario no root provisto por la imagen oficial
USER node

# Puerto expuesto por la app
EXPOSE 4000

# Comando de arranque
CMD ["node", "src/server.js"]