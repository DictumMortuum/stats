import React from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import SearchInput from './SearchInput';
import { useSelector } from "react-redux";
import { usePrice } from './hooks/usePrices';

const Price = props => {
  const { id } = props;
  const price = usePrice(id);

  return (
    <Grid key={id} item xs={12} md={6} lg={3}>
      <PriceCard boardgame={price} self_ref={true} />
    </Grid>
  )
}

export default () => {
  const { store_filtered } = useSelector(state => state.pricesReducer)

  return (
    <GenericPage
      child_data={store_filtered}
      paging={true}
      page_name="/prices/search"
      pre_component={
        <Grid item xs={12}>
          <SearchInput />
        </Grid>
      }
      component={data => data.map((tile) => <Price id={tile.id} />)}
    />
  )
}
