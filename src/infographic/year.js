import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import BarChart from './components/bar';
import PieChart from './components/pie';
import { playsPerPlayer, playsPerMonth, playsPerDay, playsPerGame, playersPerPlay, year, sortPlayers } from './common';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchOverall, fetchPlays, fetchRatings } from '../reducers/standings';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
  },
  heading: {
    backgroundColor: '#4c566a',
    color: "#eceff4",
  },
  color: {
    color: "#88c0d0"
  },
  height: {
    height: theme.spacing(100),
  },
  p: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  }
}));

const GraphItem = props => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Grid item xs={12} lg={6} className={classes.height}>
      {children}
    </Grid>
  )
}

const Infographic = props => {
  const { data } = useSelector(state => state.standingsReducer)
  const classes = useStyles();
  const dispatch = useDispatch();
  const { raw_year }= useParams();
  const current_year = parseInt(raw_year);
  const previous_year = current_year - 1;
  const next_year = current_year + 1;
  const games_previous_year = year(data)(previous_year)
  const games = year(data)(current_year)
  const perPlayer = playsPerPlayer(games)
  const perMonth = playsPerMonth(games)
  const perDay = playsPerDay(games)
  const perGame = playsPerGame(games)
  const playerCountPerGame = playersPerPlay(games)

  useEffect(() => {
    dispatch(fetchOverall())
    dispatch(fetchPlays())
    dispatch(fetchRatings())
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" style={{ flexGrow: 1 }}>Απολογισμός επιτραπεζίων παιχνιδιών <span className={classes.color}>{current_year}</span></Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} className={classes.p}>
            <Typography gutterBottom variant="h5">Mέσα στο {current_year} <b>παίξαμε συνολικά {games.length} παιχνίδια</b>, ενώ το {previous_year} παίξαμε {games_previous_year.length}.</Typography>
          </Grid>
          <GraphItem>
            <BarChart title="Παιχνίδια ανά μήνα" data={perMonth} dataKeys={[{ dataKey: "παιχνίδια", color: "#d08770", stack: "a" }, { dataKey: "ζευγάρι", color: "#5e81ac", stack: "a" }]} />
          </GraphItem>
          <GraphItem>
            <BarChart title="Παιχνίδια ανά ημέρα της βδομάδας" data={perDay} dataKeys={[{ dataKey: "παιχνίδια", color: "#bf616a", stack: "a" }, { dataKey: "ζευγάρι", color: "#81a1c1", stack: "a" }]} />
          </GraphItem>
          <GraphItem>
            <BarChart title="Παιχνίδια ανά παίχτη" data={perPlayer.filter(d => d.plays > 3)} dataKeys={[{ dataKey: "plays", color: "#4c566a" }]} />
          </GraphItem>
          <GraphItem>
            <BarChart title="Αριθμός διαφορετικών παιχνιδιών" data={perGame.slice(0, 5)} dataKeys={[{ dataKey: "plays", color: "#a3be8c" }]} />
          </GraphItem>
          <GraphItem>
            <PieChart title="Αριθμός παιχτών ανά παιχνίδι" data={playerCountPerGame} dataKeys={[{ dataKey: "size", color: ["#bf616a", "#d08770", "#b48ead", "#4c566a", "#81a1c1"] }]} />
          </GraphItem>
          <GraphItem>
            <BarChart title="Δημοφιλή παιχνίδια" data={perGame.sort(sortPlayers).filter(d => d.players > 6)} dataKeys={[{ dataKey: "players", color: "#b48ead" }]} />
          </GraphItem>
          <Grid item xs={12} className={classes.p}>
            <Typography variant="h5" gutterBottom>Ευχαριστούμε για τα παιχνίδια! Τα λέμε το {next_year}!</Typography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Infographic;
