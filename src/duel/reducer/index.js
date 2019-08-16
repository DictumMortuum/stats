import initialState from './init';
import {
  DUEL_INIT,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case DUEL_INIT:
      return initialState;
    default:
      return state;
  }
};
