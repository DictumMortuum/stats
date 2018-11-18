'use strict';

const {players} = require('../../scythe.json');
const {matrix} = require('./common');
const incrementalAverage = require('incremental-average').default;
const stats = players.map(() => incrementalAverage());

const Filter = ({winner, points}) => winner !== undefined && points !== undefined;

const Reduce = (acc, {winner, points}) => {
  let p = players.indexOf(winner);
  let ia = stats[p];
  acc[p][p] = ia.add(points);
  return acc;
}

const Init = matrix(players, players);

module.exports = data => ({
  'series': data.filter(Filter).reduce(Reduce, Init),
  'labels': players,
  'desc': 'Average winning points'
});
