import { getRoom, getRoomShips, getUsers } from './../dataBase/dataBase';
import { addShips } from '../dataBase/dataBase';
import { IUser } from '../types';
import { sender } from '../sender';

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

  firstAttacker = getFirstAttacker(users);

  const room = getRoom(parsedData.gameId);

  const findShips = (user: { index: number; ws: import('ws') }) => {
    roomShips.find((ships) => ships.indexPlayer === user.index);
  };

  const findEnemyIndex = (userId: number) => {
    const enemy = roomShips.find((ships) => ships.indexPlayer !== userId);
    return enemy.indexPlayer;
  };

  if (roomShips.length === 2) {
    room.userSockets.forEach((user) => {
      sender(user.ws, 'start_game', {
        ships: findShips(user),
        currentPlayerIndex: findEnemyIndex(user.index),
      });
    });

    room.userSockets.forEach((user) => {
      sender(user.ws, 'turn', {
        currentPlayer: firstAttacker,
      });
    });
  }
};
