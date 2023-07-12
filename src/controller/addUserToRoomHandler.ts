import { getUserBySocket, updateRoom } from '../dataBase/dataBase';
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

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify([{roomId: room.roomId, roomUsers: room.roomUsers}]),
        id: 0,
      })
    );
  });

    room.userSockets.forEach( user => {
      user.ws.send(
        JSON.stringify({
          type: 'create_game',
          data: JSON.stringify({
            idGame: room.roomId,
            idPlayer: user.index,
          }),
          id: 0,
        })
      );
    })
};
