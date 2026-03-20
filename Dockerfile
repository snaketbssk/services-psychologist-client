FROM node:20.10-alpine

# Set environment variables
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV APP_ROOT=/web

WORKDIR ${APP_ROOT}

# Copy all files
COPY . .

# Install dependencies
RUN npm install --frozen-lockfile

# Build without ESLint breaking CI
RUN npm build --no-lint

# Run the app
CMD ["npm", "start"]