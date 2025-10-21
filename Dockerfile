FROM node:18-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

#instala as dependecias
RUN pnpm install --frozen-lockfile 


# ele vai copiar o restando do codigo do projeto
COPY . . 

RUN pnpm build


FROM node:18-alpine AS runner

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown nextjs:nodejs /app


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs


EXPOSE 3000

# Comando para iniciar o servidor da aplicação
CMD ["node", "server.js"]