import { v4 } from "https://deno.land/std/uuid/mod.ts";

/**
 * UserID
 *  > userId: string
 *  > name: string
 *  > groupName: string
 *  > ws: WebSocket
 */
const usersMap = new Map();

/**
 * GroupName: [user1, user2]
 *  > groupName: string
 *  > userId: string
 *  > name: string
 *  > ws: WebSocket 
 */
const groupsMap = new Map();

const chat = async (ws) => {
  console.log("Chat Connected");

  const userId = v4.generate();

  for await (const data of ws) {
    const event = JSON.parse(data);
    switch (event.event) {
      case "join": {
        const userObj = {
          userId,
          name: event.name,
          groupName: event.groupName,
          ws,
        };
        usersMap.set(userId, userObj);
        const users = groupsMap.get(event.groupName) || [];
        users.push(userObj);
        groupsMap.set(event.groupName, users);
        emitEvent(event.groupName);
        break;
      }
      case "message": {
        break;
      }
      default: {
        break;
      }
    }
  }
};

const emitEvent = (groupName) => {
  const users = groupsMap.get(groupName) || [];
  for (const user of users) {
    const event = {
      event: "users",
      data: getDisplayUsers(groupName),
    };
    user.ws.send(JSON.stringify(event));
  }
};

const getDisplayUsers = (groupName) => {
  const users = groupsMap.get(groupName) || [];
  return users.map((u) => {
    return { userId: u.userId, name: u.name };
  });
};

export default chat;
