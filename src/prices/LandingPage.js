import React from 'react';
import { Grid } from '@material-ui/core';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';

const pricesToGroups = data => {
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
  const grouped = pricesToGroups(props.data)

  return (
    <GenericPage
      data={props.data}
      component={
        <Grid container spacing={2}>
          {grouped.map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={4}>
              <BoardgameCard {...tile} />
            </Grid>
          ))}
        </Grid>
      }
    />
  )
}
