export type INewUser = {
  name: string;
  password: string;
}
export interface IUser extends INewUser {
  id: number;
}