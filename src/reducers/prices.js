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

const calculateStores = (prices, stores) => {
  const store_ids = [...new Set(prices.map(d => d.store_id))]
  return stores.filter(d => store_ids.includes(d.id))
}

const calculateNewData = (col)  => (instock, store, search) => {
  return searchFilter(col, search).filter(stockFilter(instock)).filter(d => d.store_id === store || store === -1)
}

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

const init = ({ prices, history, stores }) => ({
  instock: true,
  store: -1,
  stock: "In stock",
  stocks: ["In stock", "In stock + Out of stock"],
  cart: [],
  cart_show: [],
  boardgames: extractBoardgames(prices),
  data: calculateNewData(prices)(true, -1, ""),
  search_term: "",
  search_results: [],
  wishlist_term: "",
  wishlist: [],
  prices,
  history,
  stores: calculateStores(prices, stores),
  spinner: false,
})

export const reducer = (state = init({prices: [], history: [], stores: []}), action) => {
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
        data: calculateNewData(state.prices)(instock, state.store, ""),
        cart_show: calculateNewData(state.cart)(instock, state.store, ""),
        search_results: state.search_term === "" ? [] : calculateNewData(state.prices)(instock, state.store, state.search_term),
      }
    case "SET_STORE":
      const store = action.store

      return {
        ...state,
        store,
        data: calculateNewData(state.prices)(state.instock, store, ""),
        cart_show: calculateNewData(state.cart)(state.instock, store, ""),
        search_results: state.search_term === "" ? [] : calculateNewData(state.prices)(state.instock, store, state.search_term),
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
      const results = calculateNewData(state.prices)(false, state.store, search_term)

      return {
        ...state,
        search_term,
        search_results: search_term === "" ? [] : results
      }
    case "SET_SEARCH_TERM":
      return {
        ...state,
        search_term: action.payload
      }
    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: action.payload
      }
    case "SET_WISHLIST_USERNAME":
      return {
        ...state,
        wishlist_term: action.payload
      }
    case "TOGGLE_SPINNER":
      return {
        ...state,
        spinner: !state.spinner
      }
    default:
      return state;
  }
};
