export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

const init = {
  open: false
}

export const reducer = (state = init, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        open: !state.open
      }
    case CLOSE_DRAWER:
      return {
        ...state,
        open: false
      }
    default:
      return state;
  }
};
