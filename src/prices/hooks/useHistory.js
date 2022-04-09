import { useState, useEffect } from 'react';
import { fetchPriceHistory } from '../api/history';

export const useHistory = boardgame_id => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    let isMounted = true;

    fetchPriceHistory(boardgame_id).then(data => {
      if (isMounted) {
        setHistory(data)
      }
    })

    return () => { isMounted = false };
  }, [boardgame_id])

  return history
}
