const fs = require("fs");
const WebSocket = require("ws"); // WebSocket client for Node.js

const ws = new WebSocket("wss://stream.binance.us:9443/ws/btcusdt@depth");

ws.on("open", () => {
  console.log("WebSocket connection opened.");
});

ws.on("message", (data) => {
  const snapshot = JSON.parse(data);
  fs.appendFileSync("btcLog.json", JSON.stringify(snapshot) + "\n");
  console.log("Snapshot saved."); // For debug
});

ws.on("error", (err) => {
  console.error("WebSocket error:", err);
});

ws.on("close", () => {
  console.log("WebSocket closed.");
});