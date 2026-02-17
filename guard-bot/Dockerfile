# vodle guard bot — runs inside Docker, does not need its own Dockerfile
# for development. Uses node:20-slim as base.

FROM node:20-slim

WORKDIR /bot

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

CMD ["node", "index.js"]
