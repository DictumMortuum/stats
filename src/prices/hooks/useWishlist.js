import { useEffect } from 'react';
import { fetchWishList } from '../api/wistlist';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';

export const useWishlist = () => {
  const { wishlist } = useSelector(state => state.pricesReducer)
  const { pathname } = useLocation();
  const username = pathname.split("/")[3]
  const dispatch = useDispatch();

  useEffect(async () => {
    if (username !== undefined) {
      dispatch({
        type: "SET_WISHLIST_USERNAME",
        payload: username,
      })

      let rs;
      try {
        rs = await fetchWishList(username, 2)
      } catch(e) {
        rs = [];
      }

      dispatch({
        type: "SET_WISHLIST",
        payload: rs
      })

    }
  }, [username])

  return wishlist
}
