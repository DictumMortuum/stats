import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import BarChart from './components/bar';
import PieChart from './components/pie';
import Button from '@material-ui/core/Button';
import { playsPerPlayer, playsPerMonth, playsPerDay, playsPerGame, playersPerPlay, year, sortPlayers } from './common';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchOverall, fetchPlays, fetchRatings } from '../reducers/standings';
import { useSelector } from 'react-redux';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from "react-router-dom";

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
  const { children, xs=12, lg=6 } = props;

  return (
    <Grid item xs={xs} lg={lg} className={classes.height}>
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
  const perPlay = perGame.reduce(
    (prev, cur) => {
      const { plays } = cur;
      if(prev[plays] === undefined) {
        prev[plays] = 1;
      } else {
        prev[plays]++;
      }

      return prev;
    }
  , []).map((d, i) => ({
    name: `${i}x`,
    value: d,
  })).filter(d => d);

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
            <Button color="inherit" component={Link} to={`/review/${previous_year}`} startIcon={<ArrowLeftIcon />}>{previous_year}</Button>
            <Button color="inherit" component={Link} to={`/review/${next_year}`} endIcon={<ArrowRightIcon />}>{next_year}</Button>
          </Toolbar>
        </AppBar>
      </Grid>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} className={classes.p}>
            <Typography gutterBottom variant="h5">
              Mέσα στο {current_year} <b>παίξαμε συνολικά {games.length} παρτίδες μοιρασμένες σε {perGame.length} διαφορετικά επιτραπέζια παιχνίδια</b>, ενώ το {previous_year} παίξαμε {games_previous_year.length}.
            </Typography>
          </Grid>
          <GraphItem>
            <BarChart
              title="Παιχνίδια ανά μήνα"
              data={perMonth}
              dataKeys={[{ dataKey: "παιχνίδια", color: "#d08770", stack: "a" }, { dataKey: "ζευγάρι", color: "#5e81ac", stack: "a" }]}
            />
          </GraphItem>
          <GraphItem>
            <BarChart
              title="Παιχνίδια ανά ημέρα της βδομάδας"
              data={perDay}
              dataKeys={[{ dataKey: "παιχνίδια", color: "#bf616a", stack: "a" }, { dataKey: "ζευγάρι", color: "#81a1c1", stack: "a" }]}
            />
          </GraphItem>
          <GraphItem>
            <BarChart
              title="Παιχνίδια ανά παίχτη"
              data={perPlayer.filter(d => d.plays > 3)}
              dataKeys={[{ dataKey: "plays", color: "#4c566a" }]}
              desc="Οι διαφορετικές παρτίδες στις οποίες συμμετείχε κάθε παίχτης"
            />
          </GraphItem>
          <GraphItem>
            <PieChart
              title="Αριθμός παιχτών ανά παιχνίδι"
              data={playerCountPerGame}
              dataKeys={[{ dataKey: "size", color: ["#bf616a", "#d08770", "#b48ead", "#4c566a", "#81a1c1"] }]}
            />
          </GraphItem>
          <GraphItem lg={12}>
            <BarChart
              title="Τα πιο παιγμένα"
              data={perGame.slice(0, 4)}
              dataKeys={[{ dataKey: "plays", color: "#a3be8c" }]}
              desc="Τα παιχνίδια τα οποία έχουμε παίξει περισσότερες φορές."
            />
          </GraphItem>
          <GraphItem>
            <BarChart
              title="Δημοφιλή παιχνίδια"
              data={perGame.sort(sortPlayers).slice(0, 2)}
              dataKeys={[{ dataKey: "players", color: "#b48ead" }]}
              desc="Τα παιχνίδια τα οποία έχουν παιχτεί από τους περισσότερους διακριτούς παίχτες."
            />
          </GraphItem>
          <GraphItem>
            <BarChart
              title="Παρτίδες ανά παιχνίδι"
              data={perPlay}
              dataKeys={[{ dataKey: "value", color: "#5e81ac" }]}
              desc={`Ο αριθμός φορών που έχουμε παίξει ένα παιχνίδι. Εντός του έτους παίξαμε ${perPlay.length > 0 ? perPlay[0].value : 0} παιχνίδια μια φορά το κάθε ένα.`}
            />
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
