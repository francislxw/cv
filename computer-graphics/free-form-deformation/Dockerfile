FROM nginx:alpine

WORKDIR /freeformdeform
COPY freeformdeform/ .

WORKDIR /etc/nginx/conf.d
RUN rm default.conf
COPY freeformdeform.conf freeformdeform.conf
