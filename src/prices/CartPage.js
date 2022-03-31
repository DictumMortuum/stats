import React from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";

export default props => {
  const { cart_show, store } = useSelector(state => state.pricesReducer)
  const data = cart_show.sort((a, b) => a.price > b.price)
  const filtered = data.filter(d => d.store_id === store || store === -1)

  return (
    <GenericPage
      child_data={filtered}
      store_data={data}
      page_name="/prices/cart"
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={4}>
          <PriceCard boardgame={tile} />
        </Grid>
      ))}
    />
  )
}
