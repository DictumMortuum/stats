import json from '../prices/prices.json';

export const TOGGLE_STOCK = 'TOGGLE_STOCK';
export const SET_STORE = 'SET_STORE';

const pricesToGroups = data => {
  const rs = [];

  data.map(d => {
    if (rs[d.rank-1] === undefined) {
      rs[d.rank-1] = {
        ...d,
        items: []
      }
    }

    rs[d.rank-1].items.push(d)
    return d
  })

  return rs.filter(d => d.items.length > 0)
}

const stockFilter = toggle => d => {
  if(toggle) {
    return d.stock === true
  } else {
    return true
  }
}

const calculateNewData = (instock, store, boardgame_id) => {
  const data = json
  .filter(stockFilter(instock))
  .filter(d => d.store_name === store || store === "")
  .filter(d => d.levenshtein < 10)
  .filter(d => d.levenshtein < d.boardgame_name.length/2.5)
  .filter(d => d.hamming < 4 || d.levenshtein < 2)

  return {
    data,
    grouped: pricesToGroups(data)
  }
}

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
  stores: [...new Set(json.map(d => d.store_name))].sort(),
  boardgames: extractBoardgames(),
  ...calculateNewData(true, ""),
}

export const reducer = (state = init, action) => {
  switch (action.type) {
    case TOGGLE_STOCK:
      const instock = !state.instock;

      return {
        ...state,
        instock,
        ...calculateNewData(instock, state.store),
      };
    case SET_STORE:
      const store = action.store

      return {
        ...state,
        store,
        ...calculateNewData(state.instock, store),
      }
    default:
      return state;
  }
};
