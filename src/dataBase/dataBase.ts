import { ICurrentUser, INewUser, IRoom, IShips, IUser } from '../types';

const UserDB: IUser[] = [];

export const createUser = (user: INewUser, socket: import("ws")) => {
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

export const getUserBySocket = (socket: import("ws")) => {
  const user = UserDB.find((user) => {
    return user.ws === socket;
  });
  return user;
};

export const getUsers =() => {
  return UserDB;
}

const RoomDB: IRoom[] = [];

export const createRoom = (socket: import("ws")) => {
  const creator = getUserBySocket(socket);
  const createdRoom: IRoom = { roomId: RoomDB.length, roomUsers: [{name: creator.name, index: creator.index}] };
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
  ShipsDB.push(data);

  console.log('ShipsDB', ShipsDB)
  return data;
};

export const getShipsByIds = (gameId: number, userId: number) => {
  const ships = ShipsDB.find((shipsArr) => {
    return shipsArr.gameId === gameId && shipsArr.indexPlayer === userId;
  });
  return ships;
};

export const getRoomShips = (gameId: number) => {
  const ships = ShipsDB.filter((shipsObj) => {
    return shipsObj.gameId === gameId;
  });
  return ships;
};
