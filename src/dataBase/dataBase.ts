import { locationsParser } from '../shipsLocations';
import { ICurrentUser, INewUser, IRoom, IShips, IUser } from '../types';

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
  };
  RoomDB.push(createdRoom);

  return createdRoom;
};

export const updateRoom = (user: ICurrentUser, roomId: number) => {
  const updatedRoom: IRoom = RoomDB.find((room) => room.roomId === roomId);
  updatedRoom.roomUsers.push(user);

  return updatedRoom;
};

export const getRoom = (roomId: number) => {
  const room: IRoom = RoomDB.find((room) => {
    room.roomId === roomId;
    return room;
  });

  return room;
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

  // const enemyShipsLocations = locationsParser(enemyShips);

  const shootResult = {
    status: 'miss',
    x: data.x,
    y: data.y,
    shipPositions: [],
    freeArea: [],
  };

  ShipsDB.map(s=>{
    if(s.indexPlayer===target){
      s.ships = enemyShips.ships.map((item) => {
    const res = item.shipPositions.find((ship) => {
      return ship.x === data.x && ship.y === data.y;
    });

    if (res) {
      item.hits.push(res);
      
      if (item.length === item.hits.length) {
        shootResult.status = 'killed';
        shootResult.freeArea = item.freeAreaPositions;
        shootResult.shipPositions = item.shipPositions;
      } else {
        shootResult.status = 'shot';
      }
      return item;
    }
    return item;
  });
    }
  })

  return shootResult;
};
