FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY react-ng/package*.json ./react-ng/
RUN npm run client:install

COPY . .
RUN npm run client:build

RUN npm prune --omit=dev

EXPOSE 84

CMD ["node", "index.js"]
