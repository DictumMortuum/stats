import React from 'react';
import { Grid } from '@material-ui/core';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";
import { pricesToGroups } from './LandingPage';
import CircularProgress from '@material-ui/core/CircularProgress';
import BggInput from './BggInput';

const Spinner = () => (
  <Grid container alignContent="center" alignItems="center" direction="column">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
)

export default props => {
  const { wishlist, spinner, data, store } = useSelector(state => state.pricesReducer)
  const filtered = data.filter(d => wishlist.includes(d.boardgame_id))
  const by_store = filtered.filter(d => d.store_id === store || store === -1)
  const grouped = pricesToGroups(by_store)

  return (
    <GenericPage
      child_data={grouped}
      store_data={filtered}
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
