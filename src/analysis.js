import {countries, players, boards, objectives} from './scythe.json';
import data from './plays.json';

/*
 * Returns an array from the least amount to the maximum.
 * e.g. discrete([13, 18]) => [13, 14, 15, 16, 17, 18]
 */
const discrete = data => {
  let distinct = [...new Set(data)].sort();
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

/*
 * percentile([1,2,3,4]) = [ 25, 33.333333333333336, 50, 100 ]
 */
const percentile = col => {
  let l = col.length;
  let modifier = x => x / l * 100;
  return Array(l).fill(1).map((x, i) => modifier(x + i));
}

export default {
  countries,
  players,
  boards,
  objectives,
  data,
  rounds: discrete(data.filter(d => d.rounds).map(d => d.rounds)),
  points: discrete(data.filter(d => d.points).map(d => d.points)),
  relativeFrequency,
  absoluteFrequency,
  percentile
};
