import React from 'react';
import { Grid } from '@material-ui/core';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";
import { pricesToGroups } from './LandingPage';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useJohn } from './hooks/useJohn';
import JohnCard from './JohnCard';
import { useStep } from './hooks/useStep';

const Spinner = () => (
  <Grid container alignContent="center" alignItems="center" direction="column">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
)

export default () => {
  const jgg_games = useJohn();
  const ids = jgg_games.map(d => d.boardgame_id);
  const { spinner } = useSelector(state => state.pricesReducer)
  const { stock_filtered, store_filtered } = useStep(col => col.filter(d => ids.includes(d.boardgame_id)))
  const grouped = pricesToGroups(store_filtered)

  return (
    <GenericPage
      child_data={grouped}
      stock_filtered={stock_filtered}
      store_filtered={store_filtered}
      page_name="/prices/johngetsgames"
      component={data => spinner ? <Spinner /> : data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={6}>
          <JohnCard {...tile} jgg_games={jgg_games} />
        </Grid>
      ))}
    />
  )
}
