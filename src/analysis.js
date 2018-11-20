import {countries, players, boards, objectives} from './scythe.json';
import data from './plays.json';

/*
 * Returns an array from the least amount of rounds played to the maximum.
 * e.g. [13, 14, 15, 16, 17, 18]
 */
const rounds = data => {
  let temp = data.filter(d => d.rounds).map(d => d.rounds);
  let distinct = [...new Set(temp)].sort();
  let low = distinct[0];
  let high = distinct.slice(-1);
  return Array(high - low + 1).fill(low).map((d, i) => d + i);
};

/*
 * Returns an array containing the relative frequency of cols.
 */
const relativeFrequency = cols => data => cols.map(x => data.filter(y => x === y).length);

/*
 * Returns an array containing the absolute frequency of cols.
 */
const absoluteFrequency = cols => data => relativeFrequency(cols)(data).map(x => x / data.length);

export default {
  countries,
  players,
  boards,
  objectives,
  data,
  rounds: rounds(data),
  relativeFrequency,
  absoluteFrequency
};
