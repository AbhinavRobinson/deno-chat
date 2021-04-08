let ws;
const chatUsersCtr = document.querySelector("#chatUsers");
const chatUsersCount = document.querySelector("#chatUsersCount");

window.addEventListener("DOMContentLoaded", () => {
  ws = new WebSocket(`ws://localhost:3000/ws`);
  ws.addEventListener("open", onConnectionOpen);
  ws.addEventListener("message", onMessageReceived);
});

const onConnectionOpen = () => {
  console.log(`Connection opened`);

  const queryParams = getQueryParams();
  console.log(queryParams);

  if (!queryParams.name || !queryParams.group) {
    window.location.href = "chat.html";
  }

  const event = {
    event: "join",
    groupName: queryParams.group,
    name: queryParams.name,
  };

  ws.send(JSON.stringify(event));
};

const onMessageReceived = (event) => {
  console.log("Message received", event);
  event = JSON.parse(event.data);
  console.log(event);
  switch (event.event) {
    case "users": {
      chatUsersCount.innerHTML = event.data.length;
      chatUsersCtr.innerHTML = "";
      event.data.forEach((u) => {
        const userEl = document.createElement(
          "div",
        );
        userEl.className = "chat-user";
        userEl.innerHTML = u.name;
        chatUsersCtr.appendChild(userEl);
      });
      break;
    }
    default: {
      break;
    }
  }
};

const getQueryParams = () => {
  const search = window.location.search.substring(1);
  const pairs = search.split("&");
  const params = {};
  for (const pair of pairs) {
    const parts = pair.split("=");
    params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return params;
};
