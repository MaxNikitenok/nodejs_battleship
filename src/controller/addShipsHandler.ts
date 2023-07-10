import { getRoomShips, getUsers } from './../dataBase/dataBase';
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

  function sendAll() {
    for (let i = 0; i < users.length; i++) {
      users[i].ws.send(
        JSON.stringify({
          type: 'start_game',
          data: JSON.stringify({
            ships: roomShips[i].ships,
            currentPlayerIndex: roomShips[i].indexPlayer,
          }),
          id: 0,
        })
      );
    }
  }

  if (roomShips.length === 2) {
    sendAll();

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
