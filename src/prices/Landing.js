import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import Toggle from './Toggle';
import StoreDropdown from './StoreDropdown';
import PriceIcon from '@material-ui/icons/LocalOffer';
import {
  stockFilter,
  pricesDate,
  pricesToGroups,
  boardgameFilter
} from './common';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
  },
  color: {
    color: "#88c0d0"
  },
  card_root: {
    display: 'flex',
  },
  card_details: {
    display: 'flex',
    flexDirection: 'column',
  },
  card_content: {
    flex: '2 0 auto',
  },
  cover: {
    width: 150,
  },
}));

const BoardgameCard = props => {
  const classes = useStyles();

  return (
    <Card key={props.id} className={classes.card_root}>
      <CardMedia
        className={classes.cover}
        image={props.thumb}
      />
      <div className={classes.card_details}>
        <CardContent className={classes.card_content}>
          <Typography component="h5" variant="h5">
            {props.boardgame_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            BGG Rank {props.rank}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={"/prices/" + props.boardgame_id}>
            <Button size="small">Prices</Button>
          </Link>
          <Button size="small" href={"https://boardgamegeek.com/boardgame/" + props.boardgame_id}>BGG Link</Button>
        </CardActions>
      </div>
    </Card>
  )
}

const TopBoardgames = props => {
  const classes = useStyles();

  const [state, setState] = React.useState({checked: true});
  const handleToggle = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const [store, setStore] = React.useState("");
  const handleStore = (event) => {
    setStore(event.target.value);
  };

  const data = props.json.filter(d => d.store_name === store || store === "")
  const grouped = pricesToGroups(data).filter(boardgameFilter(state))

  return (
    <Grid container className={classes.root} spacing={2} alignContent="center" alignItems="center" style={{ padding: 5 }}>
      <AppBar position="static" style={{ marginBottom: 20 }}>
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>Τιμές <span className={classes.color}>{pricesDate(data)}</span></Typography>
          <Toggle handleChange={handleToggle} checked={state.checked} />
          <Badge badgeContent={data.filter(stockFilter(state)).length} color="secondary" max={9999}>
            <PriceIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Grid item md={2} xs={6}>
        <StoreDropdown data={props.json} state={store} handleChange={handleStore} />
      </Grid>
      <Grid item md={10} xs={6} />

      {grouped.map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={4}>
          <BoardgameCard {...tile} />
        </Grid>
      ))}
    </Grid>
  )
}

export default TopBoardgames
