import data from './plays.json';
import score from './score';
import tiles from './tiles.json';

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

const addScoreToData = game => {
  const {setup} = game;
  const hash = {};

  score(game).forEach(({player, total}, i) => {
    hash[player] = {};
    hash[player].position = i;
    hash[player].score = total;
  });

  const temp = setup.map(d => {
    const {player} = d;
    const {position, score} = hash[player];
    d.position = position;
    d.score = score;
    return d;
  });

  return {...game, setup: temp};
};

const tilesToArray = json => {
  const temp = [];

  for (let i in tiles) {
    const t = tiles[i];
    t.name = i;
    temp.push(t);
  }

  return temp;
};

export {
  flatten,
  unique,
  relativeFrequency,
  absoluteFrequency,
  percentile
};

export default {
  players: unique(flatten(['Dimitris', 'Panagiotis', 'Elena', 'Kostas', ...collection(d => d.order)])),
  data: data.map(addScoreToData),
  rounds: discrete([1, ...data.map(d => d.rounds)]),
  tiles: tilesToArray(tiles)
};
