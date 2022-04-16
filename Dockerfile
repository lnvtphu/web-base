FROM circleci/node:16-browsers as builder

ARG REACT_ENV

USER root

RUN mkdir -p /app

WORKDIR /app

# USER root

COPY package.json /app/package.json

RUN yarn install

COPY . .

# RUN npm run test:all

# RUN npm run fetch:blocks

RUN yarn run build-$REACT_ENV

FROM nginx

WORKDIR /usr/share/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
