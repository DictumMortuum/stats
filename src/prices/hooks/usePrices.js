import { useState, useEffect } from 'react';
import { fetchPrices, fetchPrice } from '../api/prices';

export const usePrices = boardgame_id => {
  const [prices, setPrices] = useState([])

  useEffect(() => {
    fetchPrices(boardgame_id).then(data => setPrices(data))
  }, [boardgame_id])

  return prices
}

export const usePrice = price_id => {
  const [price, setPrice] = useState([])

  useEffect(() => {
    let isMounted = true;

    fetchPrice(price_id).then(data => {
      if (isMounted) {
        setPrice(data)
      }
    })

    return () => { isMounted = false };
  }, [price_id])

  return price
}
