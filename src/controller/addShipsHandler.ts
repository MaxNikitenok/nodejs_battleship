import { ICurrentUser } from '../types';
import { sender } from '../sender';
import { getRoom, getRoomUsers } from '../dataBase/roomDB';
import { addShips, getRoomShips } from '../dataBase/shipsDB';
import { attackHandler } from './attackHandler';
import { getUserByName } from '../dataBase/userDB';

export let firstAttacker: number;

const getFirstAttacker = (users: ICurrentUser[]) => {
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

  const users = getRoomUsers(parsedData.gameId);

  firstAttacker = getFirstAttacker(users);

  const room = getRoom(parsedData.gameId);

  // const findShips = (user: { index: number; ws: import('ws') }) => {
  //   roomShips.find((ships) => ships.indexPlayer === user.index);
  // };

  const findEnemyIndex = (userId: number) => {
    const enemy = roomShips.find((ships) => ships.indexPlayer !== userId);
    return enemy.indexPlayer;
  };

  if (roomShips.length === 2) {
    room.userSockets.forEach((user) => {
      sender(user.ws, 'start_game', {
        ships: parsedData,
        currentPlayerIndex: findEnemyIndex(user.index),
      });
    });

    room.userSockets.forEach((user) => {
      sender(user.ws, 'turn', {
        currentPlayer: firstAttacker,
      });
    });

    if (firstAttacker === 99) {
      console.log(222)
      const randomInteger = () => {
        const random = 0 + Math.random() * (9 + 1);
        return Math.floor(random);
      };

      const newShot = () => {
        const x = randomInteger();
        const y = randomInteger();
        return {
          x,
          y,
        };
      };

      const shot = newShot();

      const userName = users.find((user) => user.index !== 99).name;
      const user = getUserByName(userName);

      const newData = {
        gameId: parsedData.gameId,
        x: shot.x,
        y: shot.y,
        indexPlayer: user.index,
      };
      attackHandler(JSON.stringify(newData), user.ws);
    }
  }
};
