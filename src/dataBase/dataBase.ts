import { INewUser, IUser } from '../types';

const UserDB: Array<IUser> = [];

export const createUser = (user: INewUser) => {
  const createdUser: IUser = {id: UserDB.length, ...user}
  UserDB.push(createdUser);
  return createdUser;
};

export const getUserByName = (name: string) => {
  const user = UserDB.find((user) => {
    return user.name === name;
  });
  return user;
};

export const DB = {
  createUser,
  getUserByName,
};
