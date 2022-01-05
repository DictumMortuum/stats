import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import json from './prices.json';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link, Route, Switch } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import PriceIcon from '@material-ui/icons/LocalOffer';
import Price from './Price';
import Toggle from './Toggle';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
  },
  heading: {
    backgroundColor: '#4c566a',
    color: "#eceff4",
  },
  headline: {
    padding: '2%',
    textAlign: 'center',
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
  imageContainer: {
    display: "block",
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

const stockFilter = state => d => {
  if(state.checked) {
    return d.stock === true
  } else {
    return true
  }
}

const boardgameFilter = state => d => {
  if(state.checked) {
    return d.items.filter(stockFilter(state)).length > 0
  } else {
    return true
  }
}

const pricesDate = data => {
  if(data.length > 0) {
    return new Date(data[0].cr_date).toLocaleDateString('el-GR')
  } else {
    return ""
  }
}

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

const TopBoardgames = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked: true
  });

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  return (
    <Grid container className={classes.root} spacing={2} alignContent="center" alignItems="center" style={{ padding: 5 }}>
      <AppBar position="static" style={{ marginBottom: 20 }}>
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1}}>Τιμές <span className={classes.color}>{pricesDate(props.data)}</span></Typography>
          <Toggle handleChange={handleChange} checked={state.checked} />
          <Badge badgeContent={props.json.filter(stockFilter(state)).length} color="secondary" max={9999}>
            <PriceIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      {props.data.filter(boardgameFilter(state)).map((tile) => (
        <Grid key={tile.id} item xs={12} md={6} lg={4}>
          <BoardgameCard {...tile} />
        </Grid>
      ))}
    </Grid>
  )
}

export default () => {
  const data = json.filter(d => d.levenshtein < 10).filter(d => d.levenshtein < d.boardgame_name.length/2.5).filter(d => d.hamming < 4 || d.levenshtein < 2)

  const grouped = pricesToGroups(data)

  return (
    <Switch>
      <Route key={0} path="/prices" exact component={() => <TopBoardgames data={grouped} json={data} />} />
      {grouped.map((tile => (
        <Route key={tile.id} path={"/prices/" + tile.boardgame_id} exact component={() => <BoardgamePage {...tile} />} />
      )))}
    </Switch>
  )
}
