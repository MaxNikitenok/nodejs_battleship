import { AttackResponse, FinishResponse, IWins, RegResponse, StartGameResponse, TurnResponse, UpdateRoomResponse, UpdateWinnersResponse, createGameResponse } from './types';

export const sender = (
  socket: import('ws'),
  type: string,
  data:
    | RegResponse
    | createGameResponse
    | StartGameResponse
    | UpdateWinnersResponse
    | UpdateRoomResponse
    | AttackResponse
    | TurnResponse
    | FinishResponse
    | IWins[]
) => {
  socket.send(
    JSON.stringify({
      type,
      data: JSON.stringify(data),
      id: 0,
    })
  );
};
