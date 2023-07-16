import { createRoom } from '../dataBase/roomDB';
import { sender } from '../sender';
import { UpdateRoomResponse } from '../types';
import { wss } from '../ws_server';

export const createRoomHandler = (socket: import('ws')) => {
  const newRoom = createRoom(socket);
  const roomData = [{ roomId: newRoom.roomId, roomUsers: newRoom.roomUsers }];

  wss.clients.forEach((client) =>
    sender(client, 'update_room', roomData as unknown as UpdateRoomResponse)
  );

  return newRoom;
};
