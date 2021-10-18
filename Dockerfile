FROM node:12.22.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN apk update && apk add git

RUN yarn install

COPY . .
COPY --from=builder .env .

RUN yarn build

EXPOSE 3000
CMD [ "node", "server/index.js" ]
