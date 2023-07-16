import {
  addWin,
  getWinnersList,
} from '../dataBase/winsDB';
import { deleteRoom, getRoom } from '../dataBase/roomDB';
import { addFiredShot, deleteRoomShips, getShipInfo } from '../dataBase/shipsDB';
import { getUserBySocket } from '../dataBase/userDB';
import { sender } from '../sender';
import { IRoom } from '../types';
import { wss } from '../ws_server';
import { firstAttacker } from './addShipsHandler';

let flag: number | null = null;

export const attackHandler = (data: string, socket: import('ws')) => {
  const parsedData = JSON.parse(data);

  addFiredShot(parsedData);

  const room = getRoom(parsedData.gameId);

  if (flag === null) flag = firstAttacker;

  const prevShooter = getUserBySocket(socket);
  if (prevShooter.index !== flag) return;
  const currentShooter = room.roomUsers.find((user) => {
    const shooter = user.index !== prevShooter.index;
    return shooter;
  });

  const shootResult = getShipInfo(parsedData, currentShooter.index);

  room.userSockets.forEach((user) => {
    sender(user.ws, 'attack', {
      position: {
        x: shootResult.x,
        y: shootResult.y,
      },
      currentPlayer: prevShooter.index,
      status: shootResult.status,
    });
  });

  if (shootResult.status === 'miss') {
    flag = currentShooter.index;

    room.userSockets.forEach((user) => {
      sender(user.ws, 'turn', {
        currentPlayer: currentShooter.index,
      });
    });
  }

  if (shootResult.status === 'shot') {
    flag = prevShooter.index;

    room.userSockets.forEach((user) => {
      sender(user.ws, 'turn', {
        currentPlayer: prevShooter.index,
      });
    });
  }

  if (shootResult.status === 'killed') {
    flag = prevShooter.index;

    shootResult.freeArea.forEach((item) => {
      room.userSockets.forEach((user) => {
        sender(user.ws, 'attack', {
          position: {
            x: item.x,
            y: item.y,
          },
          currentPlayer: prevShooter.index,
          status: 'miss',
        });
      });
    });

    shootResult.shipPositions.forEach((item) => {
      room.userSockets.forEach((user) => {
        sender(user.ws, 'attack', {
          position: {
            x: item.x,
            y: item.y,
          },
          currentPlayer: prevShooter.index,
          status: 'killed',
        });
      });
    });

    room.userSockets.forEach((user) => {
      sender(user.ws, 'turn', {
        currentPlayer: prevShooter.index,
      });
    });
  }

  if (shootResult.status === 'finish') {
    flag = null;

    addWin(prevShooter.name);

    wss.clients.forEach((client) => {
      sender(client, 'update_winners', getWinnersList());
    });

    shootResult.freeArea.forEach((item) => {
      room.userSockets.forEach((user) => {
        sender(user.ws, 'attack', {
          position: {
            x: item.x,
            y: item.y,
          },
          currentPlayer: prevShooter.index,
          status: 'miss',
        });
      });
    });

    shootResult.shipPositions.forEach((item) => {
      room.userSockets.forEach((user) => {
        sender(user.ws, 'attack', {
          position: {
            x: item.x,
            y: item.y,
          },
          currentPlayer: prevShooter.index,
          status: 'killed',
        });
      });
    });

    deleteRoom(room.roomId);
    deleteRoomShips(room.roomId);

    room.userSockets.forEach((user) => {
      sender(user.ws, 'finish', {
        winPlayer: prevShooter.index,
      });
    });

    const roomData = [] as unknown as IRoom;

  wss.clients.forEach((client) => {
    sender(client, 'update_room', roomData);
  });
  }

  
};
