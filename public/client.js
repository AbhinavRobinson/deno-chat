let ws;

window.addEventListener("DOMContentLoaded", () => {
  ws = new WebSocket(`ws://localhost:3000/ws`);
  ws.addEventListener("open", onConnectionOpen);
  ws.addEventListener("open", onMessageReceived);

  const queryParams = getQueryParams();
});

const onConnectionOpen = () => {
  console.log(`Connection opened`);
};

const onMessageReceived = (event) => {
  console.log(`Message received`, event);
};

const getQueryParams = () => {
  const search = window.location.search.substring(1);
};