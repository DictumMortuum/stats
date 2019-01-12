import initialState from './init';
import {
  KEMET_INIT,
  KEMET_CONFIG
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case KEMET_INIT:
      return initialState;
    case KEMET_CONFIG:
      return {...state, config: action.config};
    default:
      return state;
  }
};
