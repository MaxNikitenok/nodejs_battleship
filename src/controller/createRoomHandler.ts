import { createRoom } from '../dataBase/dataBase';
import { wss } from '../ws_server';

export const createRoomHandler = (socket: import('ws')) => {
  const newRoom = createRoom(socket);

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify([{roomId: newRoom.roomId, roomUsers: newRoom.roomUsers}]),
        id: 0,
      })
    );
  });
};
