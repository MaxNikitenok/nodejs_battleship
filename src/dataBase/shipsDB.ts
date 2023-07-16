import { locationsParser } from "../shipsLocations";
import { IShips } from "../types";

const ShipsDB: IShips[] = [];

export const addShips = (data: IShips) => {
  const newData = locationsParser(data);

  ShipsDB.push(newData);

  return data;
};

export const getRoomShips = (gameId: number) => {
  const ships = ShipsDB.filter((shipsObj) => {
    return shipsObj.gameId === gameId;
  });
  return ships;
};

export const getShipInfo = (
  data: { gameId: number; x: number; y: number; indexPlayer: number },
  target: number
) => {
  const enemyShips = ShipsDB.find((ships) => {
    return ships.indexPlayer === target;
  });

  const shootResult = {
    status: 'miss',
    x: data.x,
    y: data.y,
    shipPositions: [],
    freeArea: [],
  };

  enemyShips.ships.map((item) => {
    const res = item.shipPositions.find((ship) => {
      return ship.x === data.x && ship.y === data.y;
    });

    if (res) {
      item.hits = item.hits.filter((ship) => ship !== res);

      if (item.hits.length === 0) {
        shootResult.status = 'killed';
        shootResult.freeArea = item.freeAreaPositions;
        shootResult.shipPositions = item.shipPositions;
      } else {
        shootResult.status = 'shot';
      }
      return;
    }
    return;
  });
  const allHits = enemyShips.ships.reduce((ac, i) => ac + i.hits.length, 0);

  if (allHits === 0) {
    shootResult.status = 'finish';
  }

  return shootResult;
};

export const deleteRoomShips = (roomId: number) => {
  ShipsDB.forEach((ships, i) => {
    if (ships.gameId === roomId) {
      ShipsDB.splice(i, 1);
    }
  });
  ShipsDB.forEach((ships, i) => {
    if (ships.gameId === roomId) {
      ShipsDB.splice(i, 1);
    }
  });
};

export const getFiredShots = (userId: number) => {
  const shooter = ShipsDB.find((user) => user.indexPlayer === userId);
  return shooter.firedShots;
};

export const addFiredShot = ({ gameId, x, y, indexPlayer}) => {
  ShipsDB.map((item) => {
    if(item.gameId === gameId && item.indexPlayer === indexPlayer) {
      item.firedShots.push({x, y})
    }
  })
}