# syntax = docker/dockerfile:1.3
ARG APP_ROOT=/app
ARG NODE_VERSION=16.13.1

################################################################################
# Shared configuration for Prod and Dev
FROM node:$NODE_VERSION-alpine as builder
ARG NODE_AUTH_TOKEN
ARG APP_ROOT

WORKDIR $APP_ROOT

RUN npm install -g --no-audit husky
COPY package.json yarn.lock $APP_ROOT/

################################################################################
# PROD configuration
FROM builder as builder-production
ENV NODE_ENV=production
ENV NODE_VERBOSE=false

COPY . $APP_ROOT
RUN yarn build

################################################################################
# PROD Image
FROM nginx:1.19-alpine as production
ARG APP_ROOT

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder-production $APP_ROOT/build .
COPY ./config/nginx/podato-app.conf /etc/nginx/conf.d
ENTRYPOINT ["nginx", "-g", "daemon off;"]

################################################################################
# DEV Image (build dependencies, runtime dependencies and dev quality of life)
FROM builder as development
COPY . $APP_ROOT
RUN npm install -g --no-audit eslint
CMD yarn -v
