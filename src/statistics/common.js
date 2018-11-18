'use strict';

const {plays} = require('../../plays.json');
const {boards} = require('../../scythe.json');

const rounds = () => {
  let temp = plays.filter(d => d.rounds).map(d => d.rounds);
  let distinct = [...new Set(temp)].sort();
  let low = distinct[0];
  let high = distinct.slice(-1);
  return Array(high - low + 1).fill(low).map((d, i) => d + i);
}

const combinations = country => boards.map(d => country + ' ' + d);

const matrix = (x, y) => x.map(() => y.map(() => 0));

module.exports = {
  rounds: rounds(),
  combinations,
  matrix
};
