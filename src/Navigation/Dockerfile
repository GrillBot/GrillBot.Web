FROM nginx:alpine
EXPOSE 80

LABEL org.opencontainers.image.source https://github.com/grillbot/grillbot.web
COPY nginx.conf /etc/nginx/nginx.conf
COPY favicon.ico /usr/share/nginx/html
COPY style.css /usr/share/nginx/html
COPY index.html /usr/share/nginx/html
