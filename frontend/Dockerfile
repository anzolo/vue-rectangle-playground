# build stage
FROM node:alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /var/www/html
ADD ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]