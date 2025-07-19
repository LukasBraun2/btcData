//const fs = require("fs");
//const WebSocket = require("ws"); // WebSocket client for Node.js
export function dataWrite() {
  
  alert("Button was clicked!");
  const ws = new WebSocket("wss://stream.binance.us:9443/ws/btcusdt@depth");

  ws.onopen = () => {
    console.log("WebSocket connection opened.");
  };

  ws.onmessage = (data) => {
    const itemsFromStrg = getItemFromStorage();
    const snapshot = JSON.parse(data.data);
    itemsFromStrg.push(snapshot);
    console.log(itemsFromStrg)
    localStorage.setItem('items', JSON.stringify(itemsFromStrg));   
    console.log("Snapshot saved."); // For debug

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  ws.onclose = () => {
    console.log("WebSocket closed.");
  };
  };
  function getItemFromStorage() {
      let itemsFromStrg;

      if (localStorage.getItem('items') === null) {
          itemsFromStrg = [];
      } else {
          itemsFromStrg = JSON.parse(localStorage.getItem('items'));
          console.log(itemsFromStrg);
      }
      return itemsFromStrg;
  }
}

