
FROM node:16 as build

# Set the working directory
WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

# Build the React application
RUN npm install react-router-dom@latest
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]