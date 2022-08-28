import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import { fetchOverall, fetchPlays, fetchRatings } from '../reducers/standings';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { useDispatch } from "react-redux";

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

const dateFormat = date => {
  const d = new Date(date)
  return d.getFullYear() + "/" + (d.getMonth() + 1)
}

const Game = props => {
  const { date, name, count } = props;
  return (
    <Card style={{ margin: 5 }}>
      <CardHeader title={`${count + 1} - ${name}`} subheader={`Last played on ${dateFormat(date)}`} />
    </Card>
  )
}

const removeDuplicates = col => col.filter(({ name }, index) => col.map(d => d.name).indexOf(name) === index)

const Component = props => {
  const { data } = useSelector(state => state.standingsReducer)
  const classes = useStyles();
  const dispatch = useDispatch();
  const g = removeDuplicates(data.map(d => ({ date: new Date(d.cr_date), name: d.boardgame }))).sort((a, b) => a.date - b.date)

  useEffect(() => {
    dispatch(fetchOverall())
    dispatch(fetchPlays())
    dispatch(fetchRatings())
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} style={{ marginBottom: 20 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" style={{ flexGrow: 1 }}>Παιχνίδια που έχουν να παιχτούν τον περισσότερο καιρό</Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Container maxWidth="xl">
        <Grid container>
          <Grid container>
            {g.map((d, i) => <Grid key={i} item xs={12} lg={6}><Game {...d} count={i} /></Grid>)}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}

export default Component;
