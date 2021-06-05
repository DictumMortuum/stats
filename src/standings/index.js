import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from 'react-router-dom';
import StandingsImg from './img.jpg';
import Standings from './components/standings';
import Typography from '@material-ui/core/Typography';

const wins = [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings desc={<Typography variant="body1" gutterBottom>
    For each player, the first column represents μ (mu) and the second σ (sigma), based on the <a href="https://en.wikipedia.org/wiki/TrueSkill">TrueSkill</a> algorithm. <br />
    A player's skill is represented as a normal distribution N characterized by a mean value μ (mu, representing perceived skill) and a variance σ (sigma, representing how "unconfident" test system is in the player's μ value).

  </Typography>}/>
}];

const StandingsLinks = () => (
  <div>
    <Links charts={wins} title={"General Stats"} key={"Wins"} open={true} />
    <Divider />
  </div>
);

const StandingsContent = () => (
  wins.map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {StandingsContent, StandingsLinks, StandingsImg};
