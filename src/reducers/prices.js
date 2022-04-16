export const storeFilter = store => d => d.store_id === store || store === -1

export const stockFilter = toggle => d => {
  if(toggle) {
    return d.stock === true
  } else {
    return true
  }
}

const step = state => {
  const { store, instock, filter, prices } = state;
  const page_filtered = filter !== undefined ? filter(prices) : prices
  const stock_filtered = page_filtered.filter(stockFilter(instock))
  const store_filtered = stock_filtered.filter(storeFilter(store))

  return {
    ...state,
    page_filtered,
    stock_filtered,
    store_filtered,
  }
}

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      return {
        instock: true,
        store: -1,
        stock: "In stock",
        stocks: ["In stock", "In stock + Out of stock"],
        cart_results: [],
        search_term: "",
        search_results: [],
        wishlist_term: "",
        wishlist: [],
        prices: [],
        history: [],
        stores: [],
        filter: () => [],
        spinner: true,
        page_filtered: [],
        stock_filtered: [],
        store_filtered: [],
        date: new Date(),
      }
    case "prices/fulfilled": {
      return step({
        ...state,
        spinner: false,
        prices: action.payload,
      })
    }
    case "date/fulfilled": {
      return {
        ...state,
        date: new Date(action.payload.date),
      }
    }
    case "stores/fulfilled":
      return {
        ...state,
        stores: action.payload
      }
    case "SET_STOCK": {
      const stock = action.stock;
      let instock = false;

      if(stock === "In stock") {
        instock = true
      }

      return step({
        ...state,
        stock,
        instock,
      })
    }
    case "SET_PAGE_FILTER": {
      return step({
        ...state,
        filter: action.func,
      })
    }
    case "SET_STORE": {
      return step({
        ...state,
        store: action.store,
      })
    }
    case "ADD_TO_CART":
      return {
        ...state,
        cart_results: [...state.cart_results.filter(d => d.id !== action.cart.id), action.cart],
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
