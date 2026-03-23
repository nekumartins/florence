# Build the React frontend
FROM node:20-alpine AS build-client
WORKDIR /app/client

# Install dependencies
COPY client/package*.json ./
RUN npm ci

# Copy client source and build
COPY client/ ./
# Set the API URL to be relative since they will be served from the same domain
ENV VITE_API_URL=/api

# Ensure the Google Client ID is available at build time (required by Vite)
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

RUN npm run build

# Setup the production Node.js environment
FROM node:20-alpine
WORKDIR /app

# Copy server dependencies and install
COPY server/package*.json ./server/
RUN cd server && npm ci --production

# Copy server source code
COPY server/ ./server/

# Copy the built React app from the previous stage
COPY --from=build-client /app/client/dist ./client/dist

# Expose the standard port
EXPOSE 5000

# Start the server
WORKDIR /app/server
ENV NODE_ENV=production
ENV PORT=5000

CMD ["npm", "start"]
