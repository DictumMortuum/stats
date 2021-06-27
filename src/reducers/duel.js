import initialState from './duel/init';

export const DUEL_INIT = "DUEL_INIT";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case DUEL_INIT:
      return initialState;
    default:
      return state;
  }
};
