FROM node:alpine

WORKDIR /usr/src/server

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]
