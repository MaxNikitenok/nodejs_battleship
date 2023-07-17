import { singleDB } from "../singleDB";
import { addBotToRoomHandler } from "./addBotToRoomHandler";
import { addShipsHandler } from "./addShipsHandler";
import { createRoomHandler } from "./createRoomHandler"

export const singlePlayHandler = (socket: import('ws')) => {
  const room = createRoomHandler(socket)
  addBotToRoomHandler(room.roomId)
  addShipsHandler(JSON.stringify(singleDB[0]));
} 