import { ICurrentUser, IRoom } from '../types';
import { getUserBySocket } from './userDB';

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
  if (user.ws) {
    updatedRoom.userSockets.push({ index: user.index, ws: user.ws });
  }

  return updatedRoom;
};

export const getRoom = (roomId: number) => {
  const room: IRoom = RoomDB.find((room) => {
    room.roomId === roomId;
    return room;
  });

  return room;
};

export const getRoomUsers = (roomId: number) => {
  const room = RoomDB.find((room) => room.roomId === roomId);
  return room.roomUsers;
};

export const deleteRoom = (roomId: number) => {
  RoomDB.map((room, i) => {
    if (room.roomId === roomId) {
      RoomDB.splice(i, 1);
    }
  });
};
