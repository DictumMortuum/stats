import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BarChart from './components/bar';
import PieChart from './components/pie';
import { connect } from 'react-redux';
import { playsPerPlayer, playsPerMonth, playsPerDay, playsPerGame, playersPerPlay, year, up_to_year, sortTag, sortTagDesc, sortPlayers } from './common';
import { graph } from '../standings/standings';

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
}));

const mapStateToProps = (state, props) => ({
  ...state.standingsReducer,
})

const infographic = props => {
  const { data } = props;
  const current_year = 2022;
  const previous_year = current_year - 1;
  const next_year = current_year + 1;
  const classes = useStyles();
  const up_to_current_year = up_to_year(data)(current_year)
  const games_previous_year = year(data)(previous_year)
  const games = year(data)(current_year)
  const perPlayer = playsPerPlayer(games)
  const perMonth = playsPerMonth(games)
  const perDay = playsPerDay(games)
  const perGame = playsPerGame(games)
  const playerCountPerGame = playersPerPlay(games)
  const stats = graph({...props, data: up_to_current_year})
  const topScores = games.map(d => ({
    player: d.stats[0].player,
    boardgame: d.boardgame,
    score: d.stats[0].data.score,
  }))

  return (
    <Grid container className={classes.root} spacing={5} alignContent="center" alignItems="center" style={{ padding: 20 }}>
      <AppBar position="static" style={{ marginBottom: 20 }}>
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1}}>Απολογισμός επιτραπεζίων παιχνιδιών <span className={classes.color}>{current_year}</span></Typography>
        </Toolbar>
      </AppBar>

      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="body1">Mέσα στο {current_year} <b>παίξαμε συνολικά {games.length} παιχνίδια</b>, ενώ το {previous_year} παίξαμε {games_previous_year.length}.</Typography>
      </Grid>
      <Grid item xs={2} />


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Παιχνίδια ανά μήνα</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perMonth} dataKeys={[{dataKey: "παιχνίδια", color: "#d08770", stack: "a"}, {dataKey: "ζευγάρι", color: "#5e81ac", stack: "a"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Παιχνίδια ανά ημέρα της βδομάδας</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perDay} dataKeys={[{dataKey: "παιχνίδια", color: "#bf616a", stack: "a"}, {dataKey: "ζευγάρι", color: "#81a1c1", stack: "a"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Παιχνίδια ανά παίχτη</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perPlayer.filter(d => d.plays > 3)} dataKeys={[{dataKey: "plays", color: "#4c566a"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Αριθμός διαφορετικών παιχνιδιών</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perGame.slice(0, 5)} dataKeys={[{dataKey: "plays", color: "#a3be8c"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Αριθμός παιχτών ανά παιχνίδι</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <PieChart data={playerCountPerGame} dataKeys={[{dataKey: "size", color: ["#bf616a","#d08770", "#b48ead", "#4c566a", "#81a1c1"]}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Δημοφιλή παιχνίδια</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perGame.sort(sortPlayers).filter(d => d.players > 6)} dataKeys={[{dataKey: "players", color: "#b48ead"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Περισσότεροι πόντοι</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart layout="vertical" data={topScores.sort(sortTagDesc("score")).slice(0, 11)} name="boardgame" dataKeys={[{dataKey: "score", color: "#a3be8c"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Πίστη του συστήματος στην απόδοση των παιχτών</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={stats.results.sort(sortTag("sigma")).filter(d => d.sigma < 1.200)} name="player" dataKeys={[{dataKey: "sigma", color: "#5e81ac"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
      <Typography variant="h4" gutterBottom={true}>Ευχαριστούμε για τα παιχνίδια! Τα λέμε το {next_year}!</Typography>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  )
}

export default connect(mapStateToProps)(infographic);
