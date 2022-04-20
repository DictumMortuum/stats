import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';
import { useSelector, useDispatch } from "react-redux";
import { pricesToGroups } from './LandingPage';
import CircularProgress from '@material-ui/core/CircularProgress';
import BggInput from './BggInput';
import { useWishlist } from './hooks/useWishlist';

const Spinner = () => (
  <Grid container alignContent="center" alignItems="center" direction="column">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
)

export default () => {
  const dispatch = useDispatch();
  const { store_filtered, wishlist, spinner } = useSelector(state => state.pricesReducer)
  const grouped = pricesToGroups(store_filtered)
  useWishlist();

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_FILTER",
      func: col => col.filter(d => wishlist.includes(d.boardgame_id))
    })
  }, [wishlist])

  return (
    <GenericPage
      child_data={grouped}
      page_name="/prices/wishlist"
      pre_component={
        <Grid item xs={12}>
          <BggInput />
        </Grid>
      }
      component={data => spinner ? <Spinner /> : data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={3}>
          <BoardgameCard {...tile} />
        </Grid>
      ))}
    />
  )
}
