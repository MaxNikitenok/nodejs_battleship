import { getRoom, getRoomShips, getUsers } from './../dataBase/dataBase';
import { addShips } from '../dataBase/dataBase';
import { wss } from '../ws_server';
import { IUser } from '../types';

export let firstAttacker: number;

const getFirstAttacker = (users: IUser[]) => {

  const firstAttackerIndex = () => {
    if (Math.random() < 0.49) {
      return 0;
    } else {
      return 1;
    }
  };
  return users[firstAttackerIndex()].index;
};


export const addShipsHandler = async (data: string) => {
  const parsedData = JSON.parse(data);

  addShips(parsedData);

  const roomShips = getRoomShips(parsedData.gameId);

  const users = getUsers();

  firstAttacker = getFirstAttacker(users)

  const room = getRoom(parsedData.gameId)

  const findEnemyIndex = (userId: number) => {
    const enemy = roomShips.find(ships => ships.indexPlayer !== userId);
    return enemy.indexPlayer;
  };

   

  if (roomShips.length === 2) {
    room.userSockets.forEach((user) => {
      user.ws.send(
        JSON.stringify({
          type: 'start_game',
          data: JSON.stringify({
            ships: roomShips.find(ships => ships.indexPlayer === user.index),
            currentPlayerIndex: findEnemyIndex(user.index),
          }),
          id: 0,
        })
      );
    });

    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'turn',
          data: JSON.stringify({
            currentPlayer: firstAttacker,
          }),
          id: 0,
        })
      );
    });
  }
};
