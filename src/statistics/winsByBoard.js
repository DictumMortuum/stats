'use strict';

module.exports = ({data, players, boards}) => {
  const Filter = ({winner, board}) => winner !== undefined && board !== undefined;

  const Reduce = (acc, {board, winner}) => {
    let b = boards.indexOf(board);
    let p = players.indexOf(winner);
    acc[p][b]++;
    return acc;
  };
  
  const Init = players.map(() => boards.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': boards,
    'desc': 'Wins by country'
  };
};
