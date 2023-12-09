FROM node:latest

WORKDIR /react_app

ENV PATH /create_app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

COPY . ./

CMD ["npm", "start"]