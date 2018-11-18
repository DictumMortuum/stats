'use strict';

const {players} = require('../../scythe.json');
const {matrix, combinations} = require('./common');

module.exports = base => data => {
  const Filter = ({winner, country, board}) => winner !== undefined && country === base && board !== undefined;

  const Reduce = (acc, {country, winner, board}) => {
    let p = players.indexOf(winner);
    let c = combinations(base).indexOf(country + ' ' + board);

    acc[p][c]++;
    return acc;
  };

  const Init = matrix(players, combinations(base));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': combinations(base),
    'desc': 'Wins by ' + base + ' combination'
  }
}
