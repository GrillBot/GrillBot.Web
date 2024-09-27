FROM node:20.17.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run production

FROM nginx:alpine
EXPOSE 80

LABEL org.opencontainers.image.source=https://github.com/grillbot/grillbot.web
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/admin-web/browser /usr/share/nginx/html
