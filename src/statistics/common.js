'use strict';

const info = require('../../scythe.json');
info.data = require('../../plays.json');
info.rounds = (({data}) => {
  let temp = data.filter(d => d.rounds).map(d => d.rounds);
  let distinct = [...new Set(temp)].sort();
  let low = distinct[0];
  let high = distinct.slice(-1);
  return Array(high - low + 1).fill(low).map((d, i) => d + i);
})(info);

const averageWinningPoints = require('./averageWinningPoints');
const winsByBoard = require('./winsByBoard');
const winsByCombination = require('./winsByCombination');
const winsByCountry = require('./winsByCountry');
const winsByObjectives = require('./winsByObjectives');
const winsByPlayer = require('./winsByPlayer');
const winsByRounds = require('./winsByRounds');

module.exports = () => {
  let retval = {
    'averageWinningPoints': averageWinningPoints(info),
    'winsByBoard': winsByBoard(info),
    'winsByCountry': winsByCountry(info),
    'winsByObjectives': winsByObjectives(info),
    'winsByPlayer': winsByPlayer(info),
    'winsByRounds': winsByRounds(info)
  };

  info.countries.forEach(country => {
    let name = 'winsBy' + country;
    retval[name] = winsByCombination(country)(info);
  });

  return retval;
};
