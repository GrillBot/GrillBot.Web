FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run production

FROM nginx:alpine

EXPOSE 80
LABEL org.opencontainers.image.source=https://github.com/grillbot/grillbot.web
LABEL org.opencontainers.image.licenses=MIT

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://127.0.0.1/ || exit 1

COPY nginx.conf /etc/nginx/nginx.conf
COPY security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist/admin-web/browser /usr/share/nginx/html
