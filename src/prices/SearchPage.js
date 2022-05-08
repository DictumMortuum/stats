import React from 'react';
import { Grid } from '@material-ui/core';
import GenericPage from './GenericPage';
import SearchInput from './SearchInput';
import { useSelector } from "react-redux";
import BoardgameCard from './BoardgameCard';

export const pricesToGroups = data => {
  const rs = [];
  const map = {};

  data.map((d, i) => {
    if (map[d.boardgame_id] !== undefined) {
      i = map[d.boardgame_id];
    }

    if (rs[i] === undefined) {
      rs[i] = {
        ...d,
        items: []
      }
      map[d.boardgame_id] = i
    }

    rs[i].items.push(d)
    return d
  })

  return rs.filter(d => d.items.length > 0)
}

export default () => {
  const { store_filtered } = useSelector(state => state.pricesReducer)
  const grouped = pricesToGroups(store_filtered)

  return (
    <GenericPage
      child_data={grouped}
      paging={true}
      page_name="/prices/search"
      pre_component={
        <Grid item xs={12}>
          <SearchInput />
        </Grid>
      }
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={3}>
          <BoardgameCard {...tile} />
        </Grid>
      ))}
    />
  )
}
