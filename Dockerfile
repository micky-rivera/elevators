FROM node:16 AS ui-build

WORKDIR /usr/elevators/client
COPY /client ./
RUN npm install
RUN npm run build

FROM node:16 AS server-build

WORKDIR /usr/elevators

COPY --from=ui-build /usr/elevators/client/build/ ./client/build
WORKDIR /usr/elevators/api/

COPY /api/package*.json ./
RUN npm install

COPY /api/utils.js ./
COPY /api/index.js ./

EXPOSE 8080

CMD [ "node", "index.js" ]