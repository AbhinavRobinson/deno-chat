import { v4 } from "https://deno.land/std/uuid/mod.ts";

/**
 * UserID
 *  > name: string
 *  > groupName: string,
 *  > ws: WebSocket
 */
const usersMap = new Map();

/**
 * GroupName: [user1, user2]
 *  > userId: string,
 *  > name: string,
 *  > ws: WebSocket 
 */
const groupsMap = new Map();

const chat = async (ws) => {
  console.log("Chat Connected");

  const userId = v4.generate();

  for await (const data of ws) {
    const event = JSON.parse(data);
    // switch (event.event) {
    //   // case 'join':
    //   //   const userObj = {

    //   //   }
    // }
  }
};

export default chat;
