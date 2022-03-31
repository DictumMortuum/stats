import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import BoardgameHistoricPrice from './BoardgameHistoricPrice';
import { useSelector } from "react-redux";

export default props => {
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3])
  const { data, store } = useSelector(state => state.pricesReducer)
  const items = data.filter(d => d.boardgame_id === id).sort((a, b) => a.price > b.price)
  const filtered = items.filter(d => d.store_id === store || store === -1)

  return (
    <GenericPage
      child_data={filtered}
      store_data={items}
      pre_component={
        <Grid item xs={12}>
          <BoardgameHistoricPrice boardgame_id={id} />
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
