import { useState, useEffect } from 'react';
import { fetchBoardgame } from '../api/prices';

const tpl = {
  boardgame_id: "",
  boardgame_name: "",
  images: [],
}

export const useBoardgame = boardgame_id => {
  const [boardgame, setBoardgame] = useState(tpl)

  useEffect(() => {
    let isMounted = true;

    fetchBoardgame(boardgame_id).then(data => {
      if (isMounted) {
        setBoardgame(data)
      }
    })

    return () => { isMounted = false };
  }, [boardgame_id])

  return boardgame
}
