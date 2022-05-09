export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      return {
        store: -1,
        stock: 0,
        stocks: ["In stock", "Preorder", "Out of stock"],
        cart_results: [],
        search_term: "",
        search_results: [],
        search_enabled: false,
        wishlist_term: "",
        wishlist: [],
        prices: [],
        history: [],
        stores: [],
        spinner: true,
        date: new Date(),
      }
    case "prices/fulfilled": {
      return {
        ...state,
        spinner: false,
        prices: action.payload,
      }
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
      return {
        ...state,
        stock: action.stock,
      }
    }
    case "SET_STORE": {
      return {
        ...state,
        store: action.store,
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
        search_term: action.payload,
        search_enabled: false,
      }
    case "EXECUTE_SEARCH":
      return {
        ...state,
        search_enabled: true,
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
