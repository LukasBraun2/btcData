const fs = require("fs");
const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth");

ws.onmessage = (event) => {
  const snapshot = JSON.parse(event.data);
  fs.appendFileSync("btcLog.json", JSON.stringify(snapshot) + "\n");
};

fetch('btcLog.json')
  .then(res => res.text())
  .then(text => {
    const lines = text.trim().split('\n').slice(-10);
    const data = lines.map(line => JSON.parse(line));
    
    const display = data.map((entry, i) => {
      return `#${i + 1}
Time: ${new Date(entry.E).toLocaleTimeString()}
Top Bid: ${entry.b[0]}
Top Ask: ${entry.a[0]}
---------------------------`;
    }).join("\n");

    document.getElementById('output').textContent = display;
  });
