#!/bin/bash

# Check if an environment argument is provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <environment>"
  exit 1
fi

# Set the environment variable based on the argument
ENV=$1


# Validate the environment
case $ENV in
  development|staging|testing|production)
    ;;
  *)
    echo "Unsupported environment: $ENV"
    exit 1
    ;;
esac

echo .env.${ENV}

# Set NODE_ENV environment variable
# export NODE_ENV=$ENV

# Start Docker Compose with the specified environment file
docker-compose --env-file .env.${ENV} up -d --build
# Run Docker Compose with the specified environment
#docker-compose -f docker-compose.yml -f docker-compose.$ENV.yml up --build
