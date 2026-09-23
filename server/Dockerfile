FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY package*.json ./

RUN npm config set registry https://package-mirror.liara.ir/repository/npm/ \
    && npm ci --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]