import { v4 } from "https://deno.land/std/uuid/mod.ts";

const chat = async (ws) => {
  console.log("Chat Connected");

  const userId = v4.generate();

  for await (const data of ws) {
    console.log(data);
  }
};

export default chat;
