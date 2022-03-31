import React from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";

const sorter = (a, b) => {
  return a.rank > b.rank
}

const transform = d => {
  if (d.rank === 0 || d.rank === null) {
    return {
      ...d,
      rank: 999999
    }
  } else {
    return d
  }
}

export default props => {
  const { data } = useSelector(state => state.pricesReducer)
  const filtered = data.map(transform).sort(sorter)

  return (
    <GenericPage
      child_data={filtered}
      page_name="/prices/all"
      component={data => data.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={3}>
          <PriceCard boardgame={tile} />
        </Grid>
      ))}
    />
  )
}
