FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache curl git

COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production=false

COPY . .

EXPOSE 5173

# Usamos un user que no sea root (es opcional, puede ser cualquiera)
RUN addgroup -g 1001 -S nodejs && \
   adduser -S sveltekit -u 1001 && \
   chown -R sveltekit:nodejs /app
USER sveltekit


CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
