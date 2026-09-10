FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm config set registry https://package-mirror.liara.ir/repository/npm/ 
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=development
ENV PORT=5173

COPY --from=builder /app ./

EXPOSE 5173

CMD ["npm", "run", "dev"]