#!/bin/sh

# Check PM2 version
pm2 --version || (echo "PM2 not found, exiting." && exit 1)

# Wait for the database to be ready
until pg_isready -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER}; do
  echo "Waiting for database..."
  sleep 2
done

# Run Prisma migrations
if ! npx prisma migrate deploy; then
  echo "Prisma migration failed. Exiting."
  exit 1
fi

# # Remove existing PM2 state and start PM2
# if [ -d /home/node/.pm2 ]; then
#   echo "Cleaning up PM2 state..."
#   rm -rf /home/node/.pm2
# else
#   echo "No PM2 state directory found, skipping cleanup."
# fi

# # Check if the PM2 state directory exists before trying to remove it
# if [ -d ~/.pm2 ]; then
#   echo "Cleaning up PM2 state..."
#   rm -rf ~/.pm2
# else
#   echo "No PM2 state directory found, skipping cleanup."
# fi

# Start PM2 with the appropriate environment
echo "Starting PM2..."
if ! yarn ${NODE_ENV}; then
  echo "PM2 failed to start. Please check the error messages above."
  exit 1
fi

# # Debugging: Check PM2 state directory
# echo "Before cleanup:"
# ls -la ~/.pm2 || echo "No PM2 state directory found"

# # Clean up PM2 state and start the application
# echo "Cleaning up PM2 state..."
# rm -rf ~/.pm2

# # Debugging: Verify PM2 state directory is removed
# echo "After cleanup:"
# ls -la ~/.pm2 || echo "PM2 state directory successfully removed"

# # Clean up PM2 state
# rm -rf ~/.pm2

# # Run Prisma migrations
# npx prisma migrate deploy

# # Clean up PM2 state
# rm -rf ~/.pm2

# yarn ${NODE_ENV}
