FROM nginx:alpine

WORKDIR /dragpointsimpl
COPY dragpointsimpl/ .

WORKDIR /etc/nginx/conf.d
RUN rm default.conf
COPY dragpointsimpl.conf dragpointsimpl.conf
