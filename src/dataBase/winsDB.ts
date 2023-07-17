import { IWins } from '../types';

const WinsDB: IWins[] = [];

export const getWinnersList = () => {
  const sortedWinsDB = WinsDB.sort((a, b) => b.wins - a.wins);
  return sortedWinsDB;
};

export const addWin = (userName: string) => {
  const includes = WinsDB.some((item) => item.name === userName);
  includes
    ? WinsDB.map((user) => {
        if (user.name === userName) {
          user.wins += 1;
        }
      })
    : WinsDB.push({
        name: userName,
        wins: 1,
      });
};
