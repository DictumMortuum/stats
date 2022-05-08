import { useState, useEffect } from 'react';
import { fetchJohnGames } from '../api/prices';

export const useJohn = () => {
  const [games, setGames] = useState([])

  useEffect(() => {
    let isMounted = true;

    fetchJohnGames().then(data => {
      if (isMounted) {
        setGames(data)
      }
    })

    return () => { isMounted = false };
  }, [])

  return games
}
