import data from '../standings/plays.json';
import {
  unique,
  flatten,
  collection
} from '../common';

export const STANDINGS_INIT = 'STANDINGS_INIT';

const init = ({
  players: unique(flatten(collection(data)(d => d.stats.map(p => p.player)))),
  positions: Math.max(...data.map(d => d.stats.length)),
  data
})

export const reducer = (state = init, action) => {
  switch (action.type) {
    case STANDINGS_INIT:
      return {
        ...state
      };
    default:
      return state;
  }
};
