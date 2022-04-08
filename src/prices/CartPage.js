import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useSelector, useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const { store_filtered, cart_results } = useSelector(state => state.pricesReducer)

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_FILTER",
      func: () => cart_results,
    })
  }, [cart_results])

  return (
    <GenericPage
      child_data={store_filtered}
      page_name="/prices/cart"
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={4}>
          <PriceCard boardgame={tile} />
        </Grid>
      ))}
    />
  )
}
