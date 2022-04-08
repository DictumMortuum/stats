import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import SearchInput from './SearchInput';
import { useSelector, useDispatch } from "react-redux";
import fuse from 'fuse.js';

const searchFilter = term => col => {
  if(term !== "") {
    const options = {
      includeScore: true,
      keys: ['name']
    }

    const f = new fuse(col, options)
    return f.search(term).map(d => d.item)
  } else {
    return []
  }
}
export default () => {
  const dispatch = useDispatch();
  const { store_filtered, search_term } = useSelector(state => state.pricesReducer)

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_FILTER",
      func: searchFilter(search_term)
    })
  }, [search_term])

  return (
    <GenericPage
      child_data={store_filtered}
      page_name="/prices/search"
      pre_component={
        <Grid item xs={12}>
          <SearchInput />
        </Grid>
      }
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={3}>
          <PriceCard boardgame={tile} self_ref={true} />
        </Grid>
      ))}
    />
  )
}
