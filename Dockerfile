FROM node:17-alpine3.12

WORKDIR /app

COPY . .

RUN npm install

RUN npm run typeorm:run

CMD ["npm", "run", "start", "app-1"]