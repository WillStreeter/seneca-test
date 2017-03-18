
FROM willsonic/ws-node-alpine:v0.0.1

MAINTAINER will streeter


RUN mkdir -p /seneca-micros \
      && mkdir -p /seneca-micros/base-mesh


COPY package.json /seneca-micros/base-mesh/package.json
COPY index-justbase-mesh.js /seneca-micros/base-mesh/index-justbase-mesh.js


WORKDIR /seneca-micros/base-mesh


RUN npm cache clean \
    && npm install