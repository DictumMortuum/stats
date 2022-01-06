import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Route, Switch } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import PriceIcon from '@material-ui/icons/LocalOffer';
import Price from './Price';
import Toggle from './Toggle';
import Landing from './Landing';
import json from './prices.json';
import {
  stockFilter,
  pricesDate,
  pricesToGroups
} from './common';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
  },
  color: {
    color: "#88c0d0"
  },
}));

const BoardgamePage = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked: true
  });

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const data = props.items.filter(stockFilter(state))

  return (
    <Grid container className={classes.root} spacing={2} alignContent="center" alignItems="center" style={{ padding: 5 }}>
      <AppBar position="static" style={{ marginBottom: 20 }}>
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1}}>Τιμές <span className={classes.color}>{pricesDate(data)}</span></Typography>
          <Toggle handleChange={handleChange} checked={state.checked} />
          <Badge badgeContent={data.length} color="secondary" max={999}>
            <PriceIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Grid item xs={1} />
      <Grid item xs={10}>
        <Grid container spacing={2}>
          {data.sort((a, b) => a.price > b.price).map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={4}>
              <Price {...tile} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}

export default () => {
  const data = json.filter(d => d.levenshtein < 10).filter(d => d.levenshtein < d.boardgame_name.length/2.5).filter(d => d.hamming < 4 || d.levenshtein < 2)
  const grouped = pricesToGroups(data)

  return (
    <Switch>
      <Route key={0} path="/prices" exact component={() => <Landing json={data} />} />
      {grouped.map((tile => (
        <Route key={tile.id} path={"/prices/" + tile.boardgame_id} exact component={() => <BoardgamePage {...tile} />} />
      )))}
    </Switch>
  )
}
