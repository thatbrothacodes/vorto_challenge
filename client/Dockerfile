FROM node:14.2-alpine as NODE
ENV LAST_UPDATED 20200514T204600

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
 
# runs npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin

USER node

# Install dependencies
RUN npm install -g -s --no-progress npm && \
    npm install -g -s --no-progress yarn && \
    npm install -g -s --no-progress @angular/cli

# Change working directory
COPY / /client
WORKDIR /client

USER root

# Install client dependencies and build client
RUN yarn install
RUN ng build --prod --build-optimizer

# Expose Container Port
EXPOSE 4200

FROM nginx:1.17-alpine

COPY --from=NODE /client/dist/ /usr/share/nginx/html


# copy local NGINX config to NGINX server
COPY --from=NODE /client/nginx.conf /etc/nginx/conf.d/default.conf