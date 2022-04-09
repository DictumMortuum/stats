import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import BoardgameHistoricPrice from './BoardgameHistoricPrice';
import { useSelector, useDispatch } from "react-redux";
import { usePrices } from './hooks/usePrices';
import { useHistory } from './hooks/useHistory';

export default () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3])
  const { store_filtered } = useSelector(state => state.pricesReducer)
  const history = useHistory(id)
  const prices = usePrices(id)
  const price_ids = store_filtered.map(d => d.id)

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_FILTER",
      func: col => col.filter(d => d.boardgame_id === id).sort((a, b) => a.price > b.price),
    })
  }, [id])

  return (
    <GenericPage
      child_data={prices.filter(d => price_ids.includes(d.id))}
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
