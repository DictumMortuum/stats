import React from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import SearchInput from './SearchInput';
import { useSelector } from "react-redux";

export default props => {
  const { search_results, store } = useSelector(state => state.pricesReducer)
  const filtered = search_results.filter(d => d.store_id === store || store === -1)

  return (
    <GenericPage
      store_data={search_results}
      child_data={filtered}
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
