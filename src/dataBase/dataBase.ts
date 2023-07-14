import { locationsParser } from '../shipsLocations';
import { ICurrentUser, INewUser, IRoom, IShips, IUser, IWins } from '../types';

const UserDB: IUser[] = [];

export const createUser = (user: INewUser, socket: import('ws')) => {
  const createdUser: IUser = { index: UserDB.length, ws: socket, ...user };
  UserDB.push(createdUser);
  return createdUser;
};

export const getUserByName = (name: string) => {
  const user = UserDB.find((user) => {
    return user.name === name;
  });
  return user;
};

export const getUserBySocket = (socket: import('ws')) => {
  const user = UserDB.find((user) => {
    return user.ws === socket;
  });
  return user;
};

export const getUsers = () => {
  return UserDB;
};

const RoomDB: IRoom[] = [];

export const createRoom = (socket: import('ws')) => {
  const creator = getUserBySocket(socket);
  const createdRoom: IRoom = {
    roomId: RoomDB.length,
    roomUsers: [{ name: creator.name, index: creator.index }],
    userSockets: [{ index: creator.index, ws: creator.ws }],
  };
  RoomDB.push(createdRoom);

  return createdRoom;
};

export const updateRoom = (user: ICurrentUser, roomId: number) => {
  const updatedRoom: IRoom = RoomDB.find((room) => room.roomId === roomId);
  updatedRoom.roomUsers.push({ name: user.name, index: user.index });
  updatedRoom.userSockets.push({ index: user.index, ws: user.ws });

  return updatedRoom;
};

export const getRoom = (roomId: number) => {
  const room: IRoom = RoomDB.find((room) => {
    room.roomId === roomId;
    return room;
  });

  return room;
};

export const deleteRoom = (roomId: number) => {
  RoomDB.map((room, i) => {
    if (room.roomId === roomId) {
      RoomDB.splice(i, 1);
    }
  });
};

const ShipsDB: IShips[] = [];

export const addShips = (data: IShips) => {
  const newData = locationsParser(data);

  ShipsDB.push(newData);

  return data;
};

export const getShipsByIds = (gameId: number, userId: number) => {
  const ships = ShipsDB.find((shipsObj) => {
    return shipsObj.gameId === gameId && shipsObj.indexPlayer === userId;
  });
  return ships;
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

const WinsDB: IWins[] = [];

export const getWinnersList = () => {
  const sortedWinsDB = WinsDB.sort((a, b) => b.wins - a.wins);
  return sortedWinsDB;
};

export const getUserWins = (userName: string) => {
  const user = WinsDB.find((user) => {
    return user.name === userName;
  });
  return user.wins;
};

export const addWin = (userName: string) => {
  const includes = WinsDB.some((item) => item.name === userName);
  includes
    ? WinsDB.map((user) => {
        if (user.name === userName) {
          user.wins += 1;
        }
      })
    : WinsDB.push({
        name: userName,
        wins: 1,
      });
};
