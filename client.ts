let ws: WebSocket;

window.addEventListener("DOMContentLoaded", () => {
  ws = new WebSocket(`ws://localhost:3000/ws`);
  ws.addEventListener("open", onConnectionOpen);
  ws.addEventListener("open", onMessageReceived);
});

const onConnectionOpen = () => {
  console.log(`Conneection opened`);
};

const onMessageReceived = (event) => {
  console.log(`Message received`, event);
};
