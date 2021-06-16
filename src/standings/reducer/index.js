import initialState from './init';
import {
  STANDINGS_INIT,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case STANDINGS_INIT:
      return initialState;
    default:
      return state;
  }
};
