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
 *  >groupName: string
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
          groupsName: event.groupsName,
          ws,
        };
        usersMap.set(userId, userObj);
        const users = groupsMap.get(event.groupsName) || [];
        users.push(userObj);
        groupsMap.set(event.groupsName, users);
        emitEvent(event.groupsName);
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
};

export default chat;
