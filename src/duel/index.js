import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from 'react-router-dom';
import DuelImg from './img.jpg';
import Standings from './components/standings';
import Typography from '@material-ui/core/Typography';

const wins = [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings desc={<Typography variant="body1" gutterBottom>
    The game can be played at most with 5 players, so there are 5 positions. The bars represent these positions, so for a certain player the first bar represents how many times he came first, the second bar how many he came second, etc.
  </Typography>}/>
}];

const DuelLinks = () => (
  <div>
    <Links charts={wins} title={"General Stats"} key={"Wins"} open={true} />
    <Divider />
  </div>
);

const DuelContent = () => (
  wins.map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {DuelContent, DuelLinks, DuelImg};
