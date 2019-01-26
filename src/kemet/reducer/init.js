import data from '../plays.json';
import score from './score';
import tiles from '../tiles.json';
import {
  unique,
  flatten,
  collection,
  discrete
} from '../../common';

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

export default {
  players: unique(flatten(['Dimitris', 'Panagiotis', 'Elena', 'Kostas', ...collection(data)(d => d.order)])),
  games: data.map(addScoreToData),
  rounds: discrete([1, ...data.map(d => d.rounds)]),
  tiles: tilesToArray(tiles),
  colors: ['red', 'blue', 'white', 'black'],
  config: {
    perPlayer: false
  }
};
