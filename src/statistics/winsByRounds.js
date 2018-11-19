'use strict';

module.exports = ({data, players, rounds}) => {
  const Filter = ({winner, rounds}) => winner !== undefined && rounds !== undefined;

  const Reduce = (acc, {rounds: _rounds, winner}) => {
    let r = rounds.indexOf(_rounds);
    let p = players.indexOf(winner);
    acc[p][r]++;
    return acc;
  };
  
  const Init = players.map(() => rounds.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': rounds,
    'desc': 'Wins by rounds'
  };
};
