import data from '../plays.json';
import {
  unique,
  flatten,
  collection
} from '../../common';

export default {
  players: unique(flatten(collection(data)(d => d.stats.map(p => p.player)))),
  positions: Math.max(...data.map(d => d.stats.length)),
  data
};
