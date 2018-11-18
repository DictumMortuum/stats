'use strict';

const incrementalAverage = require('incremental-average').default;

module.exports = ({data, players}) => {
  const stats = players.map(() => incrementalAverage());

  const Filter = ({winner, points}) => winner !== undefined && points !== undefined;
  
  const Reduce = (acc, {winner, points}) => {
    let p = players.indexOf(winner);
    let ia = stats[p];
    acc[p][p] = ia.add(points);
    return acc;
  }
  
  const Init = players.map(() => players.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': players,
    'desc': 'Average winning points'
  };
};
