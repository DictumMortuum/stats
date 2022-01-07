import json from '../prices/prices.json';

export const TOGGLE_STOCK = 'TOGGLE_STOCK';
export const SET_STORE = 'SET_STORE';
export const ADD_TO_CART = 'ADD_TO_CART';

const stockFilter = toggle => d => {
  if(toggle) {
    return d.stock === true
  } else {
    return true
  }
}

const calculateNewData = col => (instock, store) => col
  .filter(stockFilter(instock))
  .filter(d => d.store_name === store || store === "")
  .filter(d => d.levenshtein < 10)
  .filter(d => d.levenshtein < d.boardgame_name.length/2.5)
  .filter(d => d.hamming < 4 || d.levenshtein < 2)

const extractBoardgames = () => {
  const hm = {};

  json.map(d => {
    hm[d.boardgame_id] = d
    return d
  })

  const rs = [];

  for (let id in hm) {
    rs.push(hm[id])
  }

  return rs
}

const init = {
  instock: true,
  store: "",
  cart: [],
  cart_show: [],
  stores: [...new Set(json.map(d => d.store_name))].sort(),
  boardgames: extractBoardgames(),
  data: calculateNewData(json)(true, ""),
}

export const reducer = (state = init, action) => {
  switch (action.type) {
    case TOGGLE_STOCK:
      const instock = !state.instock;

      return {
        ...state,
        instock,
        data: calculateNewData(json)(instock, state.store),
        cart_show: calculateNewData(state.cart)(instock, state.store)
      };
    case SET_STORE:
      const store = action.store

      return {
        ...state,
        store,
        data: calculateNewData(json)(state.instock, store),
        cart_show: calculateNewData(state.cart)(state.instock, store)
      }
    case ADD_TO_CART:
      const cart = [...state.cart.filter(d => d.id !== action.cart.id), action.cart]

      return {
        ...state,
        cart,
        cart_show: calculateNewData(cart)(state.instock, state.store)
      }
    default:
      return state;
  }
};
