FROM node:latest AS build
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html