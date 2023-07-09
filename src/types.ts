export type INewUser = {
  name: string;
  password: string;
};
export interface IUser extends INewUser {
  index: number;
  ws: import('ws');
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

export type IShips = {
  gameId: number;
  ships: {
    position: {
      x: number;
      y: number;
    };
    direction: boolean;
    length: number;
    type: 'small' | 'medium' | 'large' | 'huge';
    shipPositions: {
      x: number;
      y: number;
    }[];
    freeAreaPositions: {
      x: number;
      y: number;
    }[];
    hits: {
      x: number;
      y: number;
    }[];
  }[];
  indexPlayer: number;
};
