import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import PriceIcon from '@material-ui/icons/LocalOffer';
import StoreDropdown from './StoreDropdown';
import PriceCard from './PriceCard';
import StockToggle from './StockToggle';

import {
  pricesDate,
} from './common';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
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
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[2])
  const { data } = props;
  const items = data.filter(d => d.boardgame_id === id)

  return (
    <Grid container className={classes.root} spacing={2} alignContent="center" alignItems="center">
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>Τιμές <span className={classes.color}>{pricesDate(items)}</span></Typography>
          <Badge badgeContent={items.length} color="secondary" max={9999}>
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

      <Grid item xs={1} />
      <Grid item xs={10}>
        <Grid container spacing={2}>
          {items.sort((a, b) => a.price > b.price).map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={4}>
              <PriceCard {...tile} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}
