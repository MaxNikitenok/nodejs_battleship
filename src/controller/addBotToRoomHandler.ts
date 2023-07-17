import { updateRoom } from '../dataBase/roomDB';
import { sender } from '../sender';
import { wss } from '../ws_server';

export const addBotToRoomHandler = (roomId: number) => {

  const newRoommate = {
      name: 'Bot',
      index: 99,
    };
  
  const room = updateRoom(newRoommate, roomId);
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
