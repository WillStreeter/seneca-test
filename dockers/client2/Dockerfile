
FROM willsonic/ws-node-alpine:v0.0.1

MAINTAINER will streeter

EXPOSE 5000

RUN mkdir -p /seneca-micros \
      && mkdir -p /seneca-micros/checkuserservice


COPY package.json /seneca-micros/checkuserservice/package.json
COPY client2-mesh.js /seneca-micros/checkuserservice/client2-mesh.js

WORKDIR /seneca-micros/checkuserservice


RUN npm cache clean \
    && npm install