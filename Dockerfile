FROM nginx:alpine

LABEL maintainer="Crontiers Inc."

COPY ./dist/* /usr/share/nginx/html/