import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import TimelineCard from './components/TimelineCard';
import { useSelector } from 'react-redux';
import WinsChip from './components/WinsChip';
import TotalChip from './components/TotalChip';
import { paginate } from '../common';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  }
}));

export default () => {
  const page_size = 8
  const [page, setPage] = useState(1)
  const { player_games } = useSelector(state => state.standingsReducer)
  const page_data = paginate(player_games, page_size, page)
  const classes = useStyles();

  return (
    <Grid container alignContent="center" alignItems="center" >
      <Grid item xs={12}>
        <Pagination count={parseInt(player_games.length/page_size)} page={page} onChange={(event, value) => setPage(value)} />
      </Grid>
      <Grid item className={classes.margin} xs={12}>
        <WinsChip />
        <TotalChip />
      </Grid>
      <Grid item className={classes.margin} xs={12}>
        <Grid container spacing={2}>
        {page_data.map(d => (
          <Grid key={d.id} item xs={12} md={6} lg={4} xl={3}>
            <TimelineCard {...d} />
          </Grid>
        ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
