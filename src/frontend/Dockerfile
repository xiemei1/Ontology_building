#
# (1) this is a temporary build docker
#
FROM node:14-alpine as build

# set workdir for building the app
WORKDIR /app

# prepare environment
ENV PATH /app/node_modules/.bin:$PATH
RUN apk add yarn

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install --silent

# copy local content to docker for building
COPY . /app

# build frontend
RUN yarn build

#
# (2) the actual docker image using nginx
#
FROM nginx:mainline-alpine
EXPOSE 80

# nginx extended runner
COPY nginx/run_nginx.sh /usr/run_nginx.sh
RUN chmod +x /usr/run_nginx.sh
# add nginx specific configuration
COPY nginx/nginx_default.conf.template /etc/nginx/conf.d/default.conf.template

# copy built app
COPY --from=build /app/dist /usr/share/nginx/html

ARG FRONTEND_URL_BACKEND
RUN echo "Storing backend url in frontend: $FRONTEND_URL_BACKEND"
RUN echo "Todo"

# run app
CMD ["/usr/run_nginx.sh"]
#CMD ["nginx", "-g", "daemon off;"]