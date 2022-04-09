import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';
import { useSelector, useDispatch } from "react-redux";

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

export default () => {
  const dispatch = useDispatch();
  const { store_filtered } = useSelector(state => state.pricesReducer)
  const grouped = pricesToGroups(store_filtered)

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_FILTER",
      func: col => col
    })
  }, [])

  return (
    <GenericPage
      child_data={grouped}
      paging={true}
      page_name="/prices"
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={3}>
          <BoardgameCard {...tile} />
        </Grid>
      ))}
    />
  )
}
