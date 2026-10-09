# vodle guard bot — runs inside Docker, does not need its own Dockerfile
# for development. node:22-slim, because matrix-js-sdk 43 needs Node 22.

FROM node:22-slim

WORKDIR /bot

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

CMD ["node", "index.js"]
