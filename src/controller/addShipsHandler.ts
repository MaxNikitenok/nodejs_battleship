import { getRoomShips, getUsers } from './../dataBase/dataBase';
import { addShips } from '../dataBase/dataBase';
import { IShips } from '../types';
import { wss } from '../ws_server';

export const addShipsHandler = async (data: IShips) => {
  addShips(data);

  const roomShips = getRoomShips(data.gameId);

  const users = getUsers();

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
            currentPlayer: 0,
          }),
          id: 0,
        })
      );
    });
  }
};
