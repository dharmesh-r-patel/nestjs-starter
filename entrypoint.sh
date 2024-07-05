#!/bin/sh

# Run any setup or initialization commands here
echo "Running setup..."

# Start your application
echo "Starting application..."

echo ".env.${NODE_ENV}"

# Print the DATABASE_URL to ensure it's set
echo "DATABASE_URL is set to: $APP_DESCRIPTION ${APP_DESCRIPTION}"


# Wait for the database to be ready
until pg_isready -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER}; do
  echo "Waiting for database..."
  sleep 2
done


# # Source environment variables
# if [ -f ".env.${NODE_ENV}" ]; then
#   echo "Loading environment variables from .env.${NODE_ENV}"
#   export $(grep -v '^#' .env.${NODE_ENV} | xargs)
# elif [ -f ".env" ]; then
#   echo "Loading environment variables from .env"
#   export $(grep -v '^#' .env | xargs)
# fi

# Print the DATABASE_URL to ensure it's set
echo "afetr DATABASE_URL is set to: $APP_DESCRIPTION ${APP_DESCRIPTION}"

# Run Prisma migrations
npx prisma migrate deploy

# # Start the application
# exec "$@"

# Start the application
# npm run start:prod

yarn ${NODE_ENV}
