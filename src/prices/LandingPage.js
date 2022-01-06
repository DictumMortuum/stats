import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import StockToggle from './StockToggle';
import BoardgameCard from './BoardgameCard';
import StoreDropdown from './StoreDropdown';
import PriceIcon from '@material-ui/icons/LocalOffer';
import {
  pricesDate,
} from './common';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
    padding: 5
  },
  appbar: {
    marginBottom: 20
  },
  title: {
    flexGrow: 1
  },
  color: {
    color: "#88c0d0"
  },
}));

export default props => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2} alignContent="center" alignItems="center">
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>Τιμές <span className={classes.color}>{pricesDate(props.data)}</span></Typography>
          <Badge badgeContent={props.data.length} color="secondary" max={9999}>
            <PriceIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Grid item md={2} xs={6}>
        <StoreDropdown />
      </Grid>
      <Grid item md={2} xs={6}>
        <StockToggle />
      </Grid>
      <Grid item md={8} xs={0} />

      {props.grouped.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={4}>
          <BoardgameCard {...tile} />
        </Grid>
      ))}
    </Grid>
  )
}
