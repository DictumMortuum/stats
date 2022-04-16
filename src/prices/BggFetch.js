import React, { useState, useEffect, useCallback, useRef } from 'react';
import XMLParser from 'react-xml-parser';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import pRetry from 'p-retry';

const search = name => fetch(`https://api.geekdo.com/xmlapi2/collection?username=${encodeURIComponent(name)}&wishlist=1`)
  .then(res => {
    if (res.status === 202) {
      throw new Error("impersonating an error, as we have to retry, since the request is queued on the backend now");
    } else {
      return res
    }
  })
  .then(res => res.text())
  .then(data => {
    var xml = new XMLParser().parseFromString(data);
    return xml.children.map(d => parseInt(d.attributes.objectid))
  })

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
    let rs = await pRetry(async () => {
      return await search(wishlist_term)
    }, {
      onFailedAttempt: error => {
        console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
      },
      retries: 2
    })

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
