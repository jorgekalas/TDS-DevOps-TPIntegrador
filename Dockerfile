# Etapa base
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias de sistema mínimas
RUN apk add --no-cache bash

# Copiar manifests e instalar deps primero (mejor cacheo)
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar código
COPY . .

# Exponer puerto app
EXPOSE 3000

# Variables por defecto (sobrescribir en runtime)
ENV PORT=3000

# Healthcheck simple (opcional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3000/ping || exit 1

CMD ["npm", "start"]
