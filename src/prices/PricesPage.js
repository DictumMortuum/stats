import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';
import { paginate, pages, changePage, useParams } from '../common';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(1),
  },
}));

export default props => {
  const page_size = 20
  const history = useHistory();
  const { page } = useParams();
  const classes = useStyles();
  const { data } = useSelector(state => state.pricesReducer)
  const page_data = paginate(data, page_size, page)
  const stores = [...new Set(data.map(d => d.store_name))].sort()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <GenericPage
      data={page_data}
      stores={stores}
      component={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.pagination}>
              <Pagination siblingCount={0} variant="outlined" shape="rounded" count={pages(data, page_size)} page={page} onChange={changePage("/prices/all", history)} />
            </Paper>
          </Grid>
          {page_data.sort((a, b) => a.price > b.price).map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={3}>
              <PriceCard boardgame={tile} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper className={classes.pagination}>
              <Pagination siblingCount={0} variant="outlined" shape="rounded" count={pages(data, page_size)} page={page} onChange={changePage("/prices/all", history)} />
            </Paper>
          </Grid>
        </Grid>
      }
    />
  )
}
