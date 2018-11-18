'use strict';

const {players, boards} = require('../../scythe.json');
const {matrix} = require('./common');

const Filter = ({winner, board}) => winner !== undefined && board !== undefined;

const Reduce = (acc, {board, winner}) => {
  let b = boards.indexOf(board);
  let p = players.indexOf(winner);
  acc[p][b]++;
  return acc;
};

const Init = matrix(players, boards);

module.exports = data => ({
  'series': data.filter(Filter).reduce(Reduce, Init),
  'labels': boards,
  'desc': 'Wins by country'
});
