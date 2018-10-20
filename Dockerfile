FROM node:8

WORKDIR /code

RUN npm install -g nodemon
RUN npm i -g yarn && yarn install

COPY . .

CMD npm start
