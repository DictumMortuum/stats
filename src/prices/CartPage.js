import React from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";

export default props => {
  const { cart_show } = useSelector(state => state.pricesReducer)

  return (
    <GenericPage
      data={cart_show}
      component={
        <Grid container spacing={2}>
          {cart_show.sort((a, b) => a.price > b.price).map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={4}>
              <PriceCard boardgame={tile} />
            </Grid>
          ))}
        </Grid>
      }
    />
  )
}
