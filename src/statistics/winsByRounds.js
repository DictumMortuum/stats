'use strict';

const {players} = require('../../scythe.json');
const {matrix, rounds} = require('./common');

const Filter = ({winner, rounds}) => winner !== undefined && rounds !== undefined;

const Reduce = (acc, {rounds: _rounds, winner}) => {
  let r = rounds.indexOf(_rounds);
  let p = players.indexOf(winner);
  acc[p][r]++;
  return acc;
}

const Init = matrix(players, rounds);

module.exports = data => ({
  'series': data.filter(Filter).reduce(Reduce, Init),
  'labels': rounds,
  'desc': 'Wins by rounds'
});
