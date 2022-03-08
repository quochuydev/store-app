FROM node:12.22.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN apk update && apk add git

RUN yarn

COPY . .

RUN yarn build

EXPOSE 1111

CMD [ "yarn start" ]
