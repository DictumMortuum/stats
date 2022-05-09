import React from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import BoardgameHistoricPrice from './BoardgameHistoricPrice';
import { usePrices } from './hooks/usePrices';
import { useHistory } from './hooks/useHistory';
import { useStep } from './hooks/useStep';
import { useId } from './hooks/useId';

const fn = id => col => col.filter(d => d.boardgame_id === id).sort((a, b) => a.price > b.price)

export default () => {
  const id = useId();
  const { stock_filtered, store_filtered } = useStep(fn(id));
  const history = useHistory(id);
  const prices = usePrices(id);
  const price_ids = store_filtered.map(d => d.id);

  return (
    <GenericPage
      child_data={prices.filter(d => price_ids.includes(d.id))}
      stock_filtered={stock_filtered}
      store_filtered={store_filtered}
      paging={false}
      pre_component={
        <Grid item xs={12}>
          <BoardgameHistoricPrice history={history} />
        </Grid>
      }
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={3}>
          <PriceCard boardgame={tile} />
        </Grid>
      ))}
    />
  )
}
