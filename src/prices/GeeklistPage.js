import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import GeeklistCard from './GeeklistCard';
import GenericPage from './GenericPage';
import { useSelector, useDispatch } from "react-redux";
import { pricesToGroups } from './LandingPage';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGeeklist } from './hooks/useGeeklist';
import { useLocation } from 'react-router-dom';

const Spinner = () => (
  <Grid container alignContent="center" alignItems="center" direction="column">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
)

export default () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const geeklist_id = pathname.split("/")[3]
  const { store_filtered, spinner } = useSelector(state => state.pricesReducer)
  const grouped = pricesToGroups(store_filtered)
  const geeklist = useGeeklist(geeklist_id)

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_FILTER",
      func: col => col.filter(d => geeklist.includes(d.boardgame_id))
    })
  }, [geeklist])

  return (
    <GenericPage
      child_data={grouped}
      page_size={500}
      page_name={"/prices/geeklist/" + geeklist_id}
      component={data => spinner ? <Spinner /> : data.map((tile, i) => (
        <Grid key={tile.id} item xs={12}>
          <GeeklistCard {...tile} alternate={i%2} />
        </Grid>
      ))}
    />
  )
}
