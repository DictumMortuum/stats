import React from 'react';

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const SET_MSG = 'SET_MSG';

const init = {
  open: false,
  element: props => (<div></div>)
}

export const reducer = (state = init, action) => {
  console.log(state)
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
    case SET_MSG:
      return {
        ...state,
        element: action.element
      }
    default:
      return state;
  }
};
