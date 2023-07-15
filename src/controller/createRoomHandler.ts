import { createRoom } from '../dataBase/dataBase';
import { sender } from '../sender';
import { wss } from '../ws_server';

export const createRoomHandler = (socket: import('ws')) => {
  const newRoom = createRoom(socket);
  const roomData = [{ roomId: newRoom.roomId, roomUsers: newRoom.roomUsers }];

  wss.clients.forEach((client) => {
    sender(client, 'update_room', roomData);
  });


};
