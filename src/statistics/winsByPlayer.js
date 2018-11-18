'use strict';

const {players} = require('../../scythe.json');
const {matrix} = require('./common');

const Filter = ({winner}) => winner !== undefined;

const Reduce = (acc, {winner}) => {
  let p = players.indexOf(winner);
  acc[p][p]++;
  return acc;
}

const Init = matrix(players, players);

module.exports = data => ({
  'series': data.filter(Filter).reduce(Reduce, Init),
  'labels': players,
  'desc': 'Wins'
});
