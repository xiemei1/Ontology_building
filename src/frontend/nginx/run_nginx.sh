#!/bin/sh
envsubst '${BACKEND_HOSTNAME} ${BACKEND_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"