# Use the official Node.js image as the base image
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 5000


CMD ["npm", "start"]