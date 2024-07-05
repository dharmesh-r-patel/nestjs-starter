#!/bin/sh

# Wait for the database to be ready
until pg_isready -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER}; do
  echo "Waiting for database..."
  sleep 2
done

# Run Prisma migrations
npx prisma migrate deploy

yarn ${NODE_ENV}
