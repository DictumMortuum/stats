'use strict';

const {players, objectives} = require('../../scythe.json');
const {matrix} = require('./common');

const Filter = ({winner, objectives}) => winner !== undefined && objectives !== undefined;

const Reduce = (acc, {winner, objectives}) => {
  objectives.forEach(d => {
    let o = objectives.indexOf(d);
    let p = players.indexOf(winner);
    acc[p][o]++;
  });

  return acc;
};

const Init = matrix(players, objectives);

module.exports = data => ({
  'series': data.filter(Filter).reduce(Reduce, Init),
  'labels': objectives,
  'desc': 'Wins by objectives'
});
