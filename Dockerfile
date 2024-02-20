FROM node:17

ENV NODE_OPTIONS --openssl-legacy-provider
WORKDIR /code

COPY package.json yarn.lock ./
RUN yarn install

EXPOSE 6060

CMD ["yarn", "serve"]
