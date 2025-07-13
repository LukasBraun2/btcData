fetch('btcLog.json')
  .then(res => {
    if (!res.ok) throw new Error("File not found or server error");
    return res.text();
  })
  .then(text => {
    const lines = text.trim().split('\n');
    const last10 = lines.slice(-10);
    const data = last10.map(line => JSON.parse(line));

    const formatted = data.map((entry, i) => {
      const time = new Date(entry.E).toLocaleTimeString();
      const topBid = entry.b[0];
      const topAsk = entry.a[0];

      return `#${i + 1}
Time: ${time}
Top Bid: [${topBid}]
Top Ask: [${topAsk}]
-----------------------------`;
    }).join("\n");

    document.getElementById("output").textContent = formatted;
  })
  .catch(err => {
    document.getElementById("output").textContent = "Error: " + err.message;
  });