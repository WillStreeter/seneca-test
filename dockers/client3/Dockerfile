
FROM willsonic/ws-node-alpine:v0.0.1

MAINTAINER will streeter

EXPOSE 6000

RUN mkdir -p /seneca-micros \
      && mkdir -p /seneca-micros/getuserservice


COPY package.json /seneca-micros/getuserservice/package.json
COPY MOCK_DATA.json /seneca-micros/getuserservice/MOCK_DATA.json
COPY client3-mesh.js /seneca-micros/getuserservice/client3-mesh.js


WORKDIR /seneca-micros/getuserservice



RUN npm cache clean \
    && npm install