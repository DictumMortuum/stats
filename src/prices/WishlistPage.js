import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';
import { paginate, pages, changePage, useParams } from '../common';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import BggInput from './BggInput';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

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

const Spinner = () => (
  <Grid container alignContent="center" alignItems="center" direction="column">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
)

export default props => {
  const page_size = 20
  const history = useHistory();
  const classes = useStyles();
  const { page } = useParams();
  const { wishlist, spinner, data } = useSelector(state => state.pricesReducer)
  const filtered = data.filter(d => wishlist.includes(d.boardgame_id))
  const grouped = pricesToGroups(filtered)
  const page_data = paginate(grouped, page_size, page)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <GenericPage
      data={props.data}
      component={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BggInput />
          </Grid>
          { grouped.length > page_size && <Grid item xs={12}>
            <Paper className={classes.pagination}>
              <Pagination variant="outlined" shape="rounded" count={pages(grouped, page_size)} page={page} onChange={changePage("/prices/wishlist", history)} />
            </Paper>
          </Grid> }
          { spinner && <Spinner /> }
          { !spinner && page_data.map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={3}>
              <BoardgameCard {...tile} />
            </Grid>
          ))}
          { grouped.length > page_size && <Grid item xs={12}>
            <Paper className={classes.pagination}>
              <Pagination variant="outlined" shape="rounded" count={pages(grouped, page_size)} page={page} onChange={changePage("/prices/wishlist", history)} />
            </Paper>
          </Grid> }
        </Grid>
      }
    />
  )
}
