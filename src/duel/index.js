import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from 'react-router-dom';
import DuelImg from './img.jpg';
import DuelLogo from './logo.png';
import Standings from './components/standings';
import Stats from './components/stats';
import Average from './components/average';
import Typography from '@material-ui/core/Typography';

const wins = [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings desc={<Typography variant="body1" gutterBottom>
    For each player, the bars represent in order: wins, ties, loses
  </Typography>}/>
}, {
  'text': 'Stats',
  'path': '/stats',
  'component': () => <Stats desc={<div>
    <Typography variant="body1" gutterBottom>For each player, the bars represent the average scoring points on each category.</Typography>
    <Typography variant="body1" gutterBottom>Blue: civil cards, Green: science cards, Yellow: trade cards, Purple: guilds, Grey: wonders, Black: science markers, Gold: coin, Red: battle cards.</Typography>
  </div>} />
}, {
  'text': 'Average scores per color',
  'path': '/average',
  'component': () => <Average desc={<div>
    <Typography variant="body1" gutterBottom>For each color, the first bar presents the average points that have been scored by all players.</Typography>
    <Typography variant="body1" gutterBottom>The second bar is the average of that particular color by winners only.</Typography>
    <Typography variant="body1" gutterBottom>Blue: civil cards, Green: science cards, Yellow: trade cards, Purple: guilds, Grey: wonders, Black: science markers, Gold: coin, Red: battle cards.</Typography>
  </div>} />
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

export {DuelContent, DuelLinks, DuelImg, DuelLogo};
