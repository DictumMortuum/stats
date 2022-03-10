import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import { paginate } from '../common';

export default props => {
  const page_size = 20
  const [page, setPage] = useState(1)
  const { data } = useSelector(state => state.pricesReducer)
  const page_data = paginate(data, page_size, page)
  const stores = [...new Set(data.map(d => d.store_name))].sort()

  return (
    <GenericPage
      data={page_data}
      stores={stores}
      component={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Pagination variant="outlined" shape="rounded" count={parseInt(data.length/page_size)} page={page} onChange={(event, value) => setPage(value)} />
          </Grid>
          {page_data.sort((a, b) => a.price > b.price).map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={3}>
              <PriceCard boardgame={tile} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Pagination variant="outlined" shape="rounded" count={parseInt(data.length/page_size)} page={page} onChange={(event, value) => setPage(value)} />
          </Grid>
        </Grid>
      }
    />
  )
}
