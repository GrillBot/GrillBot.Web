FROM node:16-alpine as AngularBuild

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run ng -- build --configuration=production

FROM nginx:alpine
EXPOSE 80

LABEL org.opencontainers.image.source https://github.com/grillbot/grillbot.web

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=AngularBuild /usr/src/app/dist/GrillBotPublicClient /usr/share/nginx/html
