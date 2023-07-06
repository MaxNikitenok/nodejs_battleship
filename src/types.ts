export type INewUser = {
  name: string;
  password: string;
};
export interface IUser extends INewUser {
  index: number;
}

export type ICurrentUser = {
  name: string;
  index: number;
};

export type IRoom = {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    }
  ];
};
