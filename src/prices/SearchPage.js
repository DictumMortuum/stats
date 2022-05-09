import React from 'react';
import { Grid } from '@material-ui/core';
import GenericPage from './GenericPage';
import SearchInput from './SearchInput';
import BoardgameCard from './BoardgameCard';
import { useStep } from './hooks/useStep';
import { useSelector } from "react-redux";
import fuse from 'fuse.js';

const searchFilter = col => {
  const { search_term, search_enabled, search_results } = useSelector(state => state.pricesReducer)

  if(search_term !== "" && search_enabled) {
    const options = {
      includeScore: true,
      shouldSort: true,
      ignoreLocation: true,
      keys: ['name']
    }

    const f = new fuse(col, options)
    const res = f.search(search_term).filter(d => d.score <= 0.6)
    return res.map(d => d.item)
  } else {
    return search_results
  }
}

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
  const { store_filtered, stock_filtered } = useStep(searchFilter);
  const grouped = pricesToGroups(store_filtered);

  return (
    <GenericPage
      child_data={grouped}
      stock_filtered={stock_filtered}
      store_filtered={store_filtered}
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
