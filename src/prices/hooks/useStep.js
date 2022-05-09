import { useSelector } from "react-redux";

export const storeFilter = store => d => d.store_id === store || store === -1
export const stockFilter = stock => d => d.stock === stock || stock === -1

export const useStep = f => {
  const { store, stock, prices } = useSelector(state => state.pricesReducer)
  const page_filtered = f !== undefined ? f(prices) : prices
  const stock_filtered = page_filtered.filter(stockFilter(stock))
  const store_filtered = stock_filtered.filter(storeFilter(store))

  return {
    page_filtered,
    stock_filtered,
    store_filtered,
  }
}
