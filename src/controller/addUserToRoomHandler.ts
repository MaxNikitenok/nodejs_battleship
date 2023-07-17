import { updateRoom } from '../dataBase/roomDB';
import { getUserBySocket } from '../dataBase/userDB';
import { sender } from '../sender';
import { wss } from '../ws_server';

export const addUserToRoomHandler = (data: string, socket: import('ws')) => {
  const indexRoom = JSON.parse(data).indexRoom;

  const newRoommate = () => {
    const user = getUserBySocket(socket);
    return {
      name: user.name,
      index: user.index,
      ws: user.ws,
    };
  };

  const room = updateRoom(newRoommate(), indexRoom);
  const roomData = { roomId: room.roomId, roomUsers: room.roomUsers };

  wss.clients.forEach((client) => {
    sender(client, 'update_room', roomData);
  });

  room.userSockets.forEach((user) => {
    sender(user.ws, 'create_game', {
      idGame: room.roomId,
      idPlayer: user.index,
    });
  });
};
