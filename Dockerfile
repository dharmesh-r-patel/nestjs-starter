###################
# BASE IMAGE
###################

FROM node:20-alpine as base

# Install PostgreSQL client tools for `pg_isready`
RUN apk update && apk add postgresql-client

# Install the latest npm version
RUN npm install -g npm@latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN yarn install --legacy-peer-deps
RUN yarn global add pm2 pm2-runtime

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/

# Ensure directories have correct permissions
RUN mkdir -p /usr/src/log && chown -R node:node /usr/src/log

###################
# DEVELOPMENT
###################

FROM base as development

# Bundle app source
COPY --chown=node:node . .

# RUN chmod +x entrypoint.sh
# RUN chmod +x start.sh
# RUN chmod +x stop.sh

RUN chmod +x entrypoint.sh start.sh stop.sh

# Install dependencies
COPY --chown=node:node package*.json ./
RUN yarn install --legacy-peer-deps

# Generate Prisma database client code
RUN yarn prisma:generate

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD
###################

FROM base as build

# Install app dependencies
RUN yarn install --legacy-peer-deps

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN yarn build

# # Running `yarn cache clean --force` removes the existing node_modules directory and passing in --production ensures that only the production dependencies are installed.
RUN yarn cache clean --force --production

USER node

###################
# PRODUCTION
###################

FROM base as production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

# Copy the start and stop script
COPY start.sh ./
RUN chmod +x start.sh

COPY stop.sh ./
RUN chmod +x stop.sh

# Copy the entrypoint script
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

USER node

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
    CMD pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT || exit 1

# ###################
# # BASE IMAGE
# ###################

# FROM node:20-alpine as base

# # Install PostgreSQL client tools for pg_isready
# RUN apk update && apk add postgresql-client

# # Create app directory
# WORKDIR /usr/src/app

# RUN chown -R node:node /usr/src/app

# # Install app dependencies using the npm ci command instead of npm install
# RUN yarn install --legacy-peer-deps
# RUN yarn global add pm2

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# # Copying this first prevents re-running npm install on every code change.
# # COPY prisma ./prisma/
# COPY package*.json ./
# COPY prisma ./prisma/

# # Ensure directories have correct permissions
# RUN mkdir -p /usr/src/log

# ###################
# # DEVELOPMENT
# ###################

# FROM base as development

# # Bundle app source
# COPY . .

# RUN chmod +x entrypoint.sh

# # Generate Prisma database client code
# RUN yarn generate

# # Run the build command which creates the production bundle
# USER node
# RUN yarn build

# # Use the node user from the image (instead of the root user)
# # USER node

# ###################
# # BUILD
# ###################

# FROM base as build

# # Install app dependencies
# RUN yarn install --legacy-peer-deps

# # Copy the app source code
# COPY . .

# # Ensure the dist directory exists and has the correct permissions
# # RUN mkdir -p /usr/src/app/dist

# # Use the node user from the image (instead of the root user)
# USER node

# # Run the build command which creates the production bundle

# RUN yarn build

# ###################
# # PRODUCTION
# ###################

# FROM build as production

# # Copy the bundled code from the build stage to the production image
# COPY --from=build /usr/src/app/node_modules ./node_modules
# COPY --from=build /usr/src/app/dist ./dist
# COPY --from=build /usr/src/app/prisma ./prisma

# # Copy the entrypoint script
# COPY entrypoint.sh ./
# RUN chmod +x entrypoint.sh

# # Health check
# HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
#     CMD pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT || exit 1

# HAHA
# ###################
# # BASE IMAGE
# ###################

# FROM node:20-alpine as base

# # Install PostgreSQL client tools for `pg_isready`
# RUN apk update && apk add postgresql-client

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies using the `npm ci` command instead of `npm install`
# RUN yarn install --legacy-peer-deps
# RUN yarn global add pm2

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# # Copying this first prevents re-running npm install on every code change.
# COPY --chown=node:node package*.json ./
# COPY --chown=node:node prisma ./prisma/

# # Ensure directories have correct permissions
# RUN mkdir -p /usr/src/log && chown -R node:node /usr/src/log

# ###################
# # DEVELOPMENT
# ###################

# FROM base as development

# # # Install app dependencies using the `npm ci` command instead of `npm install`
# # RUN yarn install --legacy-peer-deps
# # RUN yarn global add pm2

# # RUN mkdir -p /usr/src/log && chown -R node:node /usr/src/log

# # Bundle app source
# COPY --chown=node:node . .

# RUN chmod +x entrypoint.sh

# # Generate Prisma database client code
# RUN yarn generate

# # Use the node user from the image (instead of the root user)
# USER node

# ###################
# # BUILD
# ###################

# FROM base as build

# # Install app dependencies
# RUN yarn install --legacy-peer-deps

# WORKDIR /usr/src/app

# # COPY --chown=node:node package*.json ./
# # In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
# # COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node . .

# # Ensure dist directory has correct permissions
# RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app/dist

# # Run the build command which creates the production bundle
# RUN yarn build

# # # Running `yarn cache clean --force` removes the existing node_modules directory and passing in --production ensures that only the production dependencies are installed.
# RUN yarn cache clean --force --production

# USER node

# ###################
# # PRODUCTION
# ###################

# FROM base as production

# # Copy the bundled code from the build stage to the production image
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

# # # Ensure the dist directory exists and has the correct permissions
# # RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app/dist

# # Copy the entrypoint script
# COPY entrypoint.sh ./
# RUN chmod +x entrypoint.sh

# USER node

# # Health check
# HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
#     CMD pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT || exit 1

# # HAHAH

# "copy-assets": "cp -rv package.json dist/package.json && cp -rv pm2 dist/pm2 && cp -rv .env.production dist/.env.production",
#     "preproduction": "rimraf dist && yarn run build && yarn run copy-assets",
# "prebuild": "rimraf dist",
# "postbuild": "cp -rv package.json dist/package.json && cp -rv pm2 dist/pm2",

# # Start the application
# CMD ["sh", "./entrypoint.sh"]

# # WORKING START
# ###################
# # BUILD FOR LOCAL DEVELOPMENT
# ###################

# FROM node:20-alpine As development

# # RUN apt-get update && apt-get install -y openssl

# # Install PostgreSQL client tools for `pg_isready`
# RUN apk update && apk add postgresql-client

# # Create app directory
# WORKDIR /usr/src/app

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# # Copying this first prevents re-running npm install on every code change.
# COPY --chown=node:node package*.json ./
# COPY --chown=node:node prisma ./prisma/

# # Install app dependencies using the `npm ci` command instead of `npm install`
# RUN yarn install --legacy-peer-deps
# RUN yarn global add pm2

# RUN mkdir -p /usr/src/log && chown -R node:node /usr/src/log

# # Bundle app source
# COPY --chown=node:node . .

# RUN chmod +x entrypoint.sh

# # Generate Prisma database client code
# RUN yarn generate

# # Use the node user from the image (instead of the root user)
# USER node

# ###################
# # BUILD FOR PRODUCTION
# ###################

# FROM node:20-alpine As build

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./

# # In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# COPY --chown=node:node . .

# # Run the build command which creates the production bundle
# RUN yarn production

# # # Set NODE_ENV environment variable
# # ENV NODE_ENV production

# # Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
# RUN yarn cache clean --force

# USER node

# ###################
# # PRODUCTION
# ###################

# FROM node:20-alpine As production

# WORKDIR /usr/src/app

# # Copy the bundled code from the build stage to the production image
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

# # Health check
# HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
#     CMD pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT || exit 1

# # Ensure entrypoint.sh is executable
# # COPY --chown=node:node entrypoint.sh .
# # RUN chmod +x entrypoint.sh

# # Run migrations and start the application
# # CMD ["sh", "./entrypoint.sh"]

# # WORKING END

# Start the server using the production build
# CMD [ "node", "dist/main.js" ]
# CMD [ "yarn", "production" ]

# ###### WORKING START #####
# ###################
# # BUILD FOR LOCAL DEVELOPMENT
# ###################

# FROM node:20 As development

# # RUN apt-get update && apt-get install -y openssl

# # Create app directory
# WORKDIR /usr/src/app

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# # Copying this first prevents re-running npm install on every code change.
# COPY --chown=node:node package*.json ./

# # Install app dependencies using the `npm ci` command instead of `npm install`
# RUN npm install --legacy-peer-deps
# RUN npm install pm2 -g

# RUN mkdir -p /usr/src/log && chown -R node:node /usr/src/log

# # Bundle app source
# COPY --chown=node:node . .

# RUN npm run generate

# # Use the node user from the image (instead of the root user)
# USER node

# ###################
# # BUILD FOR PRODUCTION
# ###################

# FROM node:20-alpine As build

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./

# # In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# COPY --chown=node:node . .

# # Run the build command which creates the production bundle
# RUN npm run production

# # Set NODE_ENV environment variable
# ENV NODE_ENV production

# # Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
# RUN npm ci --only=production && npm cache clean --force

# USER node

# ###################
# # PRODUCTION
# ###################

# FROM node:20-alpine As production

# # Copy the bundled code from the build stage to the production image
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# # Start the server using the production build
# # CMD [ "node", "dist/main.js" ]
# CMD [ "npm", "run", "production" ]

# ###### WORKING END #####
###### OLD #####

# #############################
# # BUILD FOR LOCAL DEVELOPMENT
# #############################

# # Use Node.js 20.15.0 base image
# FROM node:20-alpine As development

# RUN apk add --no-cache --virtual .build-deps alpine-sdk python3

# # Set working directory
# WORKDIR /usr/src/app

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# # Copying this first prevents re-running npm install on every code change.
# COPY --chown=node:node package*.json ./
# COPY --chown=node:node yarn.lock ./
# COPY --chown=node:node prisma ./prisma/
# COPY --chown=node:node .env.development ./

# # Install dependencies
# # RUN yarn cache clean
# RUN yarn install --frozen-lockfile
# RUN yarn global add pm2

# RUN mkdir -p /usr/src/log && chown -R node:node /usr/src/log

# # Copy the rest of the application code
# COPY --chown=node:node . .

# RUN yarn generate

# # Use the node user from the image (instead of the root user)
# USER node

# ######################
# # BUILD FOR PRODUCTION
# ######################

# FROM node:20-alpine As build

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./
# COPY --chown=node:node yarn.lock ./
# COPY --chown=node:node prisma ./prisma/
# # COPY --chown=node:node .env ./
# COPY --chown=node:node .env.staging ./
# COPY --chown=node:node .env.development ./

# # In order to run `npm run build` we need access to the Nest CLI.
# # The Nest CLI is a dev dependency,
# # In the previous development stage we ran `npm ci` which installed all dependencies.
# # So we can copy over the node_modules directory from the development image into this build image.
# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# COPY --chown=node:node . .

# # Run the build command which creates the production bundle
# RUN yarn production

# # Set NODE_ENV environment variable
# ENV NODE_ENV production

# RUN yarn cache clean

# USER node

# ###################
# # PRODUCTION
# ###################

# FROM node:20-alpine As production

# WORKDIR /usr/src/app

# # Copy the bundled code from the build stage to the production image
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/package.json ./
# COPY --chown=node:node --from=build /usr/src/app/yarn.lock ./
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# # Start the server using the production build
# # CMD [ "node", "dist/main.js" ]
