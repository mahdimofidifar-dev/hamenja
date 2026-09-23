FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL
ARG VITE_UPLOAD_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_UPLOAD_URL=$VITE_UPLOAD_URL

COPY package*.json ./

RUN npm config set registry https://package-mirror.liara.ir/repository/npm/
RUN npm ci

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]