# vodle web app — runs the Angular/Ionic dev server inside a container
# so the user does not need Node.js or npm installed locally.
#
# Usage (standalone):
#   docker build -t vodle-web .
#   docker run -p 4200:4200 vodle-web
#
# Usage (via docker compose):
#   docker compose up
#
# The dev server is accessible at http://localhost:4200

FROM node:18-slim

WORKDIR /app

# Install dependencies first (cached unless package*.json changes)
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy application source
COPY . .

EXPOSE 4200

# Start the Angular dev server, binding to 0.0.0.0 so it is
# reachable from outside the container.
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
