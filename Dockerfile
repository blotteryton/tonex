FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN yarn install
COPY . /app
RUN yarn build

CMD [ "node", "dist/main.js" ]
