import { updateRoom } from '../dataBase/dataBase';
import { wss } from '../ws_server';
import { currentUser } from './regHandler';

export const addUserToRoomHandler = (data: string) => {
  const indexRoom = JSON.parse(data).indexRoom

  const room = updateRoom(currentUser, indexRoom)


  console.log('indexRoom', indexRoom);
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify([
          room,
        ]),
        id: 0,
      })
    );
  });

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'create_game',
        data: JSON.stringify({
          idGame: room.roomId,
          idPlayer: currentUser.index,
        }),
        id: 0,
      })
    );
  });
};
