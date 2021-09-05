FROM node:12.22.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# package: git+http
RUN apk update && apk add git

RUN yarn install

# RUN npm ci --only=production

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "node", "server/index.js" ]
