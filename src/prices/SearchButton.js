import React, { useState, useEffect, useCallback, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";

const Component = () => {
  const [isSending, setIsSending] = useState(false)
  const history = useHistory();
  const isMounted = useRef(true)

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

    history.push("/prices/search")

    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, []) // update the callback if the state changes

  return (
    <InputAdornment position="end">
      <IconButton type="submit" disabled={isSending} onClick={sendRequest} aria-label="search">
        <SearchIcon />
      </IconButton>
    </InputAdornment>
  )
}

export default Component;
