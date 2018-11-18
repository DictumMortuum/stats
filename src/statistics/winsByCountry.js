'use strict';

const {players, countries} = require('../../scythe.json');
const {matrix} = require('./common');

const Filter = ({winner, country}) => winner !== undefined && country !== undefined;

const Reduce = (acc, {country, winner}) => {
  let c = countries.indexOf(country);
  let p = players.indexOf(winner);
  acc[p][c]++;
  return acc;
};

const Init = matrix(players, countries);

module.exports = data => ({
  'series': data.filter(Filter).reduce(Reduce, Init),
  'labels': countries,
  'desc': 'Wins by country'
});
