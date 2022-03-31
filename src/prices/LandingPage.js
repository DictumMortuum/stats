import React from 'react';
import { Grid } from '@material-ui/core';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";

export const pricesToGroups = data => {
  const rs = [];

  data.map(d => {
    if (rs[d.rank-1] === undefined) {
      rs[d.rank-1] = {
        ...d,
        items: []
      }
    }

    rs[d.rank-1].items.push(d)
    return d
  })

  return rs.filter(d => d.items.length > 0)
}

export default props => {
  const { data, store } = useSelector(state => state.pricesReducer)
  const filtered = data.filter(d => d.store_id === store || store === -1)
  const grouped = pricesToGroups(filtered)

  return (
    <GenericPage
      child_data={grouped}
      store_data={data}
      page_name="/prices"
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={3}>
          <BoardgameCard {...tile} />
        </Grid>
      ))}
    />
  )
}
