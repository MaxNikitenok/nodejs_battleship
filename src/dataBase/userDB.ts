import { INewUser, IUser } from '../types';

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