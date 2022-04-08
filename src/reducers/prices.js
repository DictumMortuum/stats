const storeFilter = store => d => d.store_id === store || store === -1

const stockFilter = toggle => d => {
  if(toggle) {
    return d.stock === true
  } else {
    return true
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
        spinner: true,
        page_filtered: [],
        stock_filtered: [],
        store_filtered: [],
      }
    case "prices/fulfilled": {
      const { store, instock, filter } = state;
      const page_filtered = filter(action.payload.prices)
      const stock_filtered = page_filtered.filter(stockFilter(instock))
      const store_filtered = stock_filtered.filter(storeFilter(store))

      return {
        ...state,
        spinner: false,
        prices: action.payload.prices,
        page_filtered,
        stock_filtered,
        store_filtered,
      }
    }
    case "stores/fulfilled":
      return {
        ...state,
        stores: action.payload
      }
    case "history/fulfilled":
      return {
        ...state,
        history: action.payload
      }
    case "SET_STOCK": {
      const stock = action.stock;
      let instock = false;

      if(stock === "In stock") {
        instock = true
      }

      const { prices, store, filter } = state;
      const page_filtered = filter(prices)
      const stock_filtered = page_filtered.filter(stockFilter(instock))
      const store_filtered = stock_filtered.filter(storeFilter(store))

      return {
        ...state,
        stock,
        instock,
        page_filtered,
        stock_filtered,
        store_filtered,
      }
    }
    case "SET_PAGE_FILTER": {
      const { prices, store, instock } = state;
      const page_filtered = action.func(prices)
      const stock_filtered = page_filtered.filter(stockFilter(instock))
      const store_filtered = stock_filtered.filter(storeFilter(store))

      return {
        ...state,
        filter: action.func,
        page_filtered,
        stock_filtered,
        store_filtered,
      }
    }
    case "SET_STORE": {
      const store = action.store;
      const { prices, instock, filter } = state;
      const page_filtered = filter(prices)
      const stock_filtered = page_filtered.filter(stockFilter(instock))
      const store_filtered = stock_filtered.filter(storeFilter(store))

      return {
        ...state,
        store,
        page_filtered,
        stock_filtered,
        store_filtered,
      }
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
