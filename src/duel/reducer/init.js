import data from '../plays.json';
import score from './score';
import {
  unique,
  flatten,
  collection
} from '../../common';

export default {
  players: unique(flatten(collection(data)(d => [d.player2.player, d.player1.player]))),
  games: data.map(addScoreToData)
};
