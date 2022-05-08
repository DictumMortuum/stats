import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import GenericPage from './GenericPage';
import { useSelector, useDispatch } from "react-redux";
import { pricesToGroups } from './LandingPage';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useJohn } from './hooks/useJohn';
import JohnCard from './JohnCard';

const Spinner = () => (
  <Grid container alignContent="center" alignItems="center" direction="column">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
)

export default () => {
  const dispatch = useDispatch();
  const jgg_games = useJohn();
  const ids = jgg_games.map(d => d.boardgame_id);
  const { store_filtered, spinner } = useSelector(state => state.pricesReducer)
  const grouped = pricesToGroups(store_filtered)

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_FILTER",
      func: col => col.filter(d => ids.includes(d.boardgame_id))
    })
  }, [jgg_games])

  return (
    <GenericPage
      child_data={grouped}
      page_name="/prices/johngetsgames"
      component={data => spinner ? <Spinner /> : data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={6}>
          <JohnCard {...tile} jgg_games={jgg_games} />
        </Grid>
      ))}
    />
  )
}
