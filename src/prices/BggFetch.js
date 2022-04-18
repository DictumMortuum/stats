import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import { fetchWishList } from './api/wistlist';

const Component = props => {
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)
  const dispatch = useDispatch();
  const { wishlist_term } = useSelector(state => state.pricesReducer)

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const sendRequest = useCallback(async() => {
    // don't send again while we are sending
    if (isSending) return
    // update state
    setIsSending(true)

    dispatch({
      type: "TOGGLE_SPINNER"
    })

    // send the actual request
    let rs;
    try {
      rs = await fetchWishList(wishlist_term, 2)
    } catch(e) {
      rs = [];
    }

    dispatch({
      type: "SET_WISHLIST",
      payload: rs
    })

    dispatch({
      type: "TOGGLE_SPINNER"
    })

    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [dispatch, wishlist_term]) // update the callback if the state changes

  return (
    <InputAdornment position="end">
      <IconButton type="submit" disabled={isSending} onClick={e => { e.preventDefault(); sendRequest() }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </InputAdornment>
  )
}

export default Component;
