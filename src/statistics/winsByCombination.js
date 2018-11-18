'use strict';

module.exports = base => ({data, players, boards}) => {
  const combinations = boards.map(d => base + ' ' + d);

  const Filter = ({winner, country, board}) => winner !== undefined && country === base && board !== undefined;

  const Reduce = (acc, {country, winner, board}) => {
    let p = players.indexOf(winner);
    let c = combinations.indexOf(country + ' ' + board);

    acc[p][c]++;
    return acc;
  };

  const Init = players.map(() => combinations.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': combinations,
    'desc': 'Wins by ' + base + ' combination'
  };
};
