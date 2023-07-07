import { getUserBySocket, getUsers, updateRoom } from '../dataBase/dataBase';
import { wss } from '../ws_server';
// import { currentUser } from './regHandler';

export const addUserToRoomHandler = (data: string, socket: import('ws')) => {
  const indexRoom = JSON.parse(data).indexRoom;

  const newRoommate = () => {
    const user = getUserBySocket(socket);
    return {
      name: user.name,
      index: user.index,
    };
  };

  const room = updateRoom(newRoommate(), indexRoom);

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify([room]),
        id: 0,
      })
    );
  });

  const users = getUsers();

  function sendAll() {
    for (let i = 0; i < users.length; i++) {
      users[i].ws.send(
        JSON.stringify({
          type: 'create_game',
          data: JSON.stringify({
            idGame: room.roomId,
            idPlayer: i,
          }),
          id: 0,
        })
      );
    }
  }

  sendAll();
};
