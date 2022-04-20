import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useBoardgame } from './hooks/useBoardgame';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
  padding: {
    paddingLeft: theme.spacing(1),
  },
  colored: {
    backgroundColor: "#81a1c1",
    color: "white",
  }
}));

export default props => {
  const classes = useStyles();
  const { id, boardgame_id, rank, items, alternate } = props;
  const boardgame = useBoardgame(boardgame_id);
  const { boardgame_name } = boardgame;
  const available_prices = items.sort((a, b) => a.price > b.price)
  const l = available_prices.length;

  let lowest = undefined;
  let highest = undefined;

  if (l >= 1) {
    lowest = available_prices[0]
  }

  if (l >= 2) {
    if (lowest.price !== available_prices[l-1].price) {
      highest = available_prices[l-1]
    }
  }

  return (
    <Link to={"/prices/item/" + boardgame_id} style={{ textDecoration: "none"}}>
      <Paper className={classNames(classes.margin, {[classes.colored]: alternate === 0})}>
        <Grid container spacing={2} key={id}>
          <Grid item xs={8}>
            <Typography variant="subtitle1" className={classes.padding}>

                {boardgame_name}

            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">
              BGG Rank {rank}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">
            {lowest && "€" + lowest.price} {highest && "- €" + highest.price}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  )
}
