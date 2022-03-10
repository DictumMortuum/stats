import fuse from 'fuse.js';

const stockFilter = toggle => d => {
  if(toggle) {
    return d.stock === true
  } else {
    return true
  }
}

const searchFilter = (col, term) => {
  if(term !== "") {
    const options = {
      includeScore: true,
      keys: ['name']
    }

    const f = new fuse(col, options)
    return f.search(term).map(d => d.item)
  } else {
    return col
  }
}

const calculateNewData = col => (instock, store, search) => searchFilter(col, search)
  .filter(stockFilter(instock))
  .filter(d => d.store_name === store || store === "")
  // .filter(d => d.levenshtein < 10)
  // .filter(d => d.levenshtein < d.boardgame_name.length/2.5)
  // .filter(d => d.hamming < 4 || d.levenshtein < 2)

const extractBoardgames = json => {
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

const init = json => ({
  instock: true,
  store: "",
  stock: "In stock",
  stocks: ["In stock", "In stock + Out of stock"],
  cart: [],
  cart_show: [],
  boardgames: extractBoardgames(json),
  data: calculateNewData(json)(true, "", ""),
  search_term: "",
  search_results: [],
  json,
  spinner: false,
})

export const reducer = (state = init([]), action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        spinner: true
      }
    case "posts/fetchPrices/fulfilled":
      return init(action.payload)
    case "SET_STOCK":
      const stock = action.stock;
      let instock = false;

      if(stock === "In stock") {
        instock = true
      }

      return {
        ...state,
        instock,
        stock,
        data: calculateNewData(state.json)(instock, state.store, ""),
        cart_show: calculateNewData(state.cart)(instock, state.store, ""),
        search_results: state.search_term === "" ? [] : calculateNewData(state.json)(instock, state.store, state.search_term),
      }
    case "SET_STORE":
      const store = action.store

      return {
        ...state,
        store,
        data: calculateNewData(state.json)(state.instock, store, ""),
        cart_show: calculateNewData(state.cart)(state.instock, store, ""),
        search_results: state.search_term === "" ? [] : calculateNewData(state.json)(state.instock, store, state.search_term),
      }
    case "ADD_TO_CART":
      const cart = [...state.cart.filter(d => d.id !== action.cart.id), action.cart]

      return {
        ...state,
        cart,
        cart_show: calculateNewData(cart)(state.instock, state.store, "")
      }
    case "SEARCH":
      const search_term = action.payload;
      const results = calculateNewData(state.json)(false, state.store, search_term)

      return {
        ...state,
        search_term,
        search_results: search_term === "" ? [] : results
      }
    default:
      return state;
  }
};
