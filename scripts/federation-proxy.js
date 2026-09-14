#!/usr/bin/env node
/*
 * A TCP proxy in front of the test homeservers' federation ports, so that a
 * spec can cut and heal the link between them (plan session 9b, #329):
 *
 *   PROXY_MAP="8449:8459,8450:8460"   public port -> the port Synapse listens on
 *   CONTROL_PORT=8011                 HTTP: GET /status, POST /partition, POST /heal
 *
 * Federation between Synapse servers is TLS; the proxy forwards bytes and
 * never looks inside. While partitioned it destroys the open connections
 * and refuses new ones, which is what a network split looks like to the
 * servers. Started and stopped by scripts/test-matrix.sh; no dependencies.
 */
const net = require("net");
const http = require("http");

const map = (process.env.PROXY_MAP || "8449:8459,8450:8460").split(",").map((pair) => {
  const [from, to] = pair.split(":").map((s) => parseInt(s.trim(), 10));
  return { from, to };
});
const controlPort = parseInt(process.env.CONTROL_PORT || "8011", 10);

let partitioned = false;
const sockets = new Set();

for (const { from, to } of map) {
  const server = net.createServer((client) => {
    if (partitioned) {
      client.destroy();
      return;
    }
    const upstream = net.connect(to, "127.0.0.1");
    sockets.add(client);
    sockets.add(upstream);
    const drop = () => {
      client.destroy();
      upstream.destroy();
      sockets.delete(client);
      sockets.delete(upstream);
    };
    client.on("error", drop);
    upstream.on("error", drop);
    client.on("close", drop);
    upstream.on("close", drop);
    client.pipe(upstream);
    upstream.pipe(client);
  });
  server.listen(from, "0.0.0.0", () => console.log(`[federation-proxy] ${from} -> 127.0.0.1:${to}`));
}

http.createServer((req, res) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }
  if (req.method === "POST" && req.url === "/partition") {
    partitioned = true;
    for (const socket of sockets) socket.destroy();
    sockets.clear();
    console.log("[federation-proxy] partitioned");
  } else if (req.method === "POST" && req.url === "/heal") {
    partitioned = false;
    console.log("[federation-proxy] healed");
  } else if (!(req.method === "GET" && req.url === "/status")) {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ error: "unknown endpoint" }));
    return;
  }
  res.writeHead(200, headers);
  res.end(JSON.stringify({ partitioned, connections: sockets.size / 2, map }));
}).listen(controlPort, "0.0.0.0", () => console.log(`[federation-proxy] control on ${controlPort}`));
