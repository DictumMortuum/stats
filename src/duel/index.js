import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DuelLogo from './logo.png';
import Standings from './components/standings';
import Stats from './components/stats';
import Average from './components/average';
import Typography from '@material-ui/core/Typography';

export const links = [{
  "section": "General Stats",
  "open": true,
  "items": [{
    'text': 'Standings',
    'path': '/',
  }, {
    'text': 'Average scores per color',
    'path': '/average/',
  }, {
    'text': 'Stats',
    'path': '/stats',
  }]
}];

export default () => (
  <Switch>
    <Route exact path="/">
      <Standings desc={
        <Typography variant="body1" gutterBottom>
          For each player, the bars represent in order: wins, ties, loses
        </Typography>}
      />
    </Route>
    <Route exact path="/stats">
      <Stats desc={<div>
        <Typography variant="body1" gutterBottom>For each player, the bars represent the average scoring points on each category.</Typography>
        <Typography variant="body1" gutterBottom>Blue: civil cards, Green: science cards, Yellow: trade cards, Purple: guilds, Grey: wonders, Black: science markers, Gold: coin, Red: battle cards.</Typography>
      </div>} />
    </Route>
    <Route exact path="/average">
      <Average desc={<div>
        <Typography variant="body1" gutterBottom>For each color, the first bar presents the average points that have been scored by all players.</Typography>
        <Typography variant="body1" gutterBottom>The second bar is the average of that particular color by winners only.</Typography>
        <Typography variant="body1" gutterBottom>Blue: civil cards, Green: science cards, Yellow: trade cards, Purple: guilds, Grey: wonders, Black: science markers, Gold: coin, Red: battle cards.</Typography>
      </div>} />
    </Route>
  </Switch>
)

export {DuelLogo};
