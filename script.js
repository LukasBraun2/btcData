const fs = require("fs");
const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth");

ws.onmessage = (event) => {
  const snapshot = JSON.parse(event.data);
  fs.appendFileSync("btcLog.json", JSON.stringify(snapshot) + "\n");
  console.log("Snapshot saved."); // For debug

ws.on("error", (err) => {
  console.error("WebSocket error:", err);
});

ws.on("close", () => {
  console.log("WebSocket closed.");
});
};
