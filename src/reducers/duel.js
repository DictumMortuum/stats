import initialState from './duel/init';

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      return initialState;
    default:
      return state;
  }
};
