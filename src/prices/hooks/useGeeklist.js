import { useState, useEffect } from 'react';
import { fetchGeeklist } from '../api/geeklist';

export const useGeeklist = geeklist_id => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchGeeklist(geeklist_id, 2).then(rs => {
      setItems(rs)
    })
  }, [geeklist_id])

  return items
}
