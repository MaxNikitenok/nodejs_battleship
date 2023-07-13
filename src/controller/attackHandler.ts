import {
  addWin,
  deleteRoom,
  deleteRoomShips,
  getRoom,
  getShipInfo,
  getUserBySocket,
  getWinnersList,
} from '../dataBase/dataBase';
import { wss } from '../ws_server';
import { firstAttacker } from './addShipsHandler';

let flag: number | null = null;

export const attackHandler = (data: string, socket: import('ws')) => {
  const parsedData = JSON.parse(data);

  const room = getRoom(parsedData.gameId);

  if (flag === null) flag = firstAttacker;

  const prevShooter = getUserBySocket(socket);
  if (prevShooter.index !== flag) return;
  const currentShooter = room.roomUsers.find((user) => {
    const shooter = user.index !== prevShooter.index;
    return shooter;
  });

  const shootResult = getShipInfo(parsedData, currentShooter.index);

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'attack',
        data: JSON.stringify({
          position: {
            x: shootResult.x,
            y: shootResult.y,
          },
          currentPlayer: prevShooter.index,
          status: shootResult.status,
        }),
        id: 0,
      })
    );
  });

  if (shootResult.status === 'miss') {
    flag = currentShooter.index;

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
  }

  if (shootResult.status === 'shot') {
    flag = prevShooter.index;

    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'turn',
          data: JSON.stringify({
            currentPlayer: prevShooter.index,
          }),
          id: 0,
        })
      );
    });
  }

  if (shootResult.status === 'killed') {
    flag = prevShooter.index;

    shootResult.freeArea.forEach((item) => {
      wss.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'attack',
            data: JSON.stringify({
              position: {
                x: item.x,
                y: item.y,
              },
              currentPlayer: prevShooter.index,
              status: 'miss',
            }),
            id: 0,
          })
        );
      });
    });

    shootResult.shipPositions.forEach((item) => {
      wss.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'attack',
            data: JSON.stringify({
              position: {
                x: item.x,
                y: item.y,
              },
              currentPlayer: prevShooter.index,
              status: 'killed',
            }),
            id: 0,
          })
        );
      });
    });

    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'turn',
          data: JSON.stringify({
            currentPlayer: prevShooter.index,
          }),
          id: 0,
        })
      );
    });
  }

  if (shootResult.status === 'finish') {
    flag = prevShooter.index;

    addWin(prevShooter.name);

    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'update_winners',
          data: JSON.stringify(getWinnersList()),
          id: 0,
        })
      );
    });

    shootResult.freeArea.forEach((item) => {
      wss.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'attack',
            data: JSON.stringify({
              position: {
                x: item.x,
                y: item.y,
              },
              currentPlayer: prevShooter.index,
              status: 'miss',
            }),
            id: 0,
          })
        );
      });
    });

    shootResult.shipPositions.forEach((item) => {
      wss.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'attack',
            data: JSON.stringify({
              position: {
                x: item.x,
                y: item.y,
              },
              currentPlayer: prevShooter.index,
              status: 'killed',
            }),
            id: 0,
          })
        );
      });
    });

    deleteRoom(room.roomId);
    deleteRoomShips(room.roomId);

    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'finish',
          data: JSON.stringify({
            winPlayer: prevShooter.index,
          }),
          id: 0,
        })
      );
    });
  }

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify([]),
        id: 0,
      })
    );
  });
};
