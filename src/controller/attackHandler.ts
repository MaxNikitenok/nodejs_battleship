import { getRoom, getUserBySocket } from '../dataBase/dataBase';
import { wss } from '../ws_server';

export const attackHandler = (data: {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}, socket: import("ws")) => {
  console.log(data);
  console.log('room', getRoom(data.gameId));

  const room = getRoom(data.gameId)

  const prevShooter = getUserBySocket(socket);
  const currentShooter = room.roomUsers.find( user => {
    const shooter = user.index !== prevShooter.index
    return shooter;
  })

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'turn',
        data: JSON.stringify({
          currentPlayer: currentShooter.index,
        }),
        id: 0,
      })
    );
  });
};
