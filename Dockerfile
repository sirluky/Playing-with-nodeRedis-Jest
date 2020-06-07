FROM node:12.14.0-alpine 

WORKDIR /app

COPY package.json ./

RUN npm i 


COPY ./ ./


CMD ['node day1.js']