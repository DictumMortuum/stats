import React from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";

export default props => {
  const { cart_show } = useSelector(state => state.pricesReducer)
  const data = cart_show.sort((a, b) => a.price > b.price)

  return (
    <GenericPage
      child_data={data}
      page_name="/prices/cart"
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={4}>
          <PriceCard boardgame={tile} />
        </Grid>
      ))}
    />
  )
}
