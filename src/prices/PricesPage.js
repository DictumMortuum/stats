import React from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useStep } from './hooks/useStep';

const sorter = (a, b) => {
  return a.rank > b.rank
}

const transform = d => {
  if (d.rank === 0 || d.rank === null || d.rank === undefined) {
    return {
      ...d,
      rank: 999999
    }
  } else {
    return d
  }
}

export default () => {
  const { store_filtered, stock_filtered } = useStep(col => col.map(transform).sort(sorter));

  return (
    <GenericPage
      child_data={store_filtered}
      stock_filtered={stock_filtered}
      store_filtered={store_filtered}
      page_name="/prices/all"
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={3}>
          <PriceCard boardgame={tile} />
        </Grid>
      ))}
    />
  )
}
