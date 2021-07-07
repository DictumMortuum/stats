import initialState from './kemet/init';

export const KEMET_CONFIG = 'KEMET_CONFIG';

export const config = config => ({
  type: KEMET_CONFIG,
  config
});

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      return initialState;
    case KEMET_CONFIG:
      return {...state, config: action.config};
    default:
      return state;
  }
};
