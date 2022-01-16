import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';

export default props => {
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3])
  const { data } = props;
  const items = data.filter(d => d.boardgame_id === id)

  return (
    <GenericPage
      data={items}
      component={
        <Grid container spacing={2}>
          {items.sort((a, b) => a.price > b.price).map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={3}>
              <PriceCard boardgame={tile} />
            </Grid>
          ))}
        </Grid>
      }
    />
  )
}
