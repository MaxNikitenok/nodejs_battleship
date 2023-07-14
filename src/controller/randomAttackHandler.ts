import { getFiredShots } from '../dataBase/dataBase';
import { attackHandler } from './attackHandler';

export const randomAttackHandler = (data: string, socket: import('ws')) => {
  const parsedData = JSON.parse(data);

  const firedShots = getFiredShots(parsedData.indexPlayer);

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

  let shot = newShot()

  if (firedShots.includes(shot)) {
    shot = newShot()
  } else {
    const newData = { gameId: parsedData.gameId, x: shot.x, y: shot.y, indexPlayer: parsedData.indexPlayer }
    attackHandler(JSON.stringify(newData), socket)
  }
};
