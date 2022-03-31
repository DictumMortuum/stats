import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';
import Paper from '@material-ui/core/Paper';
import { paginate, pages, changePage, useParams } from '../common';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(1),
  },
}));

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
  const page_size = 40
  const history = useHistory();
  const { page } = useParams();
  const { data } = useSelector(state => state.pricesReducer)
  const grouped = pricesToGroups(data)
  const page_data = paginate(grouped, page_size, page)
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <GenericPage
      data={data}
      component={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.pagination}>
              <Pagination variant="outlined" shape="rounded" count={pages(grouped, page_size)} page={page} onChange={changePage("/prices", history)} />
            </Paper>
          </Grid>
          {page_data.map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={3}>
              <BoardgameCard {...tile} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper className={classes.pagination}>
              <Pagination variant="outlined" shape="rounded" count={pages(grouped, page_size)} page={page} onChange={changePage("/prices", history)} />
            </Paper>
          </Grid>
        </Grid>
      }
    />
  )
}
