FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm config set registry https://package-mirror.liara.ir/repository/npm/ 
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]