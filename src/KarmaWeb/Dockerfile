FROM node:16-alpine as AngularBuild
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run ng -- build --configuration=production

FROM nginx:alpine
LABEL org.opencontainers.image.source https://github.com/grillbot/karma-web
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=AngularBuild /usr/src/app/dist/web /usr/share/nginx/html
