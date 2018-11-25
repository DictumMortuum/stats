import data from './plays.json';

/*
 * Returns the distinct elements of an array.
 */
const unique = col => [...new Set(col)];

/*
 * Flattens an array.
 */
const flatten = col => [].concat.apply([], col);

/*
 * Creates a flat array of the distinct elements identified by function f.
 * Useful for extracting collections of elements from the data.
 * If series length < 4, chartist has an issue with that.
 */
const collection = f => {
  let temp = unique(flatten(data.filter(f).map(f)));
  let l = temp.length;
  
  if (l < 4) {
    return [...temp, ...Array(4 - l).fill("")];
  } else {
    return temp;
  }
}

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
  countries: collection(d => d.country).sort(),
  players: collection(d => d.winner),
  boards: collection(d => d.board),
  objectives: collection(d => d.objectives).sort(),
  data,
  rounds: discrete(collection(d => d.rounds)),
  points: discrete(collection(d => d.points)),
  passives: collection(d => d.passive),
  aggressives: collection(d => d.aggressive),
  resolutions: collection(d => d.resolution),
  relativeFrequency,
  absoluteFrequency,
  percentile
};
