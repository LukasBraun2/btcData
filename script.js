//const fs = require("fs");
//const WebSocket = require("ws"); // WebSocket client for Node.js
export function dataWrite() {
  const listItems = document.getElementById('item-list');
  alert("Button was clicked!");
  const ws = new WebSocket("wss://stream.binance.us:9443/ws/btcusdt@depth");
  function displayItems() {
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach((value) => addItemToDOM(value));
  }
function addItemToDOM(itemVal){
    //create a new list item
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(itemVal));
    //adding items to list
    listItems.appendChild(item);
}
  ws.onopen = () => {
    console.log("WebSocket connection opened.");
  };

  ws.onmessage = (data) => {
    const itemsFromStrg = getItemFromStorage();
    const snapshot = JSON.parse(data.data);
    itemsFromStrg.push(snapshot);
    localStorage.setItem('items', JSON.stringify(itemsFromStrg));   
   displayItems();
    console.log("Snapshot saved."); // For debug

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  ws.onclose = () => {
    console.log("WebSocket closed.");
  };
  };
  
function getItemFromStorage() {
  let items = [];

  const stored = localStorage.getItem('items');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const last10 = parsed.slice(-1);

      items = last10.map((entry, i) => {

        const time = new Date(entry.E).toLocaleTimeString();
        const topBid = entry.b?.[0]?.[0] ?? "N/A";
        const topAsk = entry.a?.[0]?.[0] ?? "N/A";

        return `#${i + 1}
Time: ${time}
Top Bid: [${topBid}]
Top Ask: [${topAsk}]
-----------------------------`;
      });

    } catch (err) {
      console.error("Error parsing storage:", err);
    }
  }

  return items;
}


}

