import { ICurrentUser, INewUser, IRoom, IUser } from '../types';

const UserDB: IUser[] = [];

export const createUser = (user: INewUser) => {
  const createdUser: IUser = { index: UserDB.length, ...user };
  UserDB.push(createdUser);
  return createdUser;
};

export const getUserByName = (name: string) => {
  const user = UserDB.find((user) => {
    return user.name === name;
  });
  return user;
};

const RoomDB: IRoom[] = [];

export const createRoom = (user: ICurrentUser) => {
  const createdRoom: IRoom = { roomId: RoomDB.length, roomUsers: [user] };
  RoomDB.push(createdRoom);
  return createdRoom;
};

export const updateRoom = (user: ICurrentUser, roomId: number) => {
  const updatedRoom: IRoom = RoomDB.find((room) => room.roomId === roomId);
  updatedRoom.roomUsers.push(user)
  console.log(RoomDB)

  return updatedRoom;
};
