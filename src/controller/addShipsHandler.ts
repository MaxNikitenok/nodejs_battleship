import { getRoomShips, getUsers } from './../dataBase/dataBase';
import { addShips } from '../dataBase/dataBase';
import { wss } from '../ws_server';

export const addShipsHandler = async (data: string) => {
  const parsedData = JSON.parse(data)

  addShips(parsedData);

  const roomShips = getRoomShips(parsedData.gameId);

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
