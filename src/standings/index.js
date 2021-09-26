import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from 'react-router-dom';
import StandingsImg from './img.jpg';
import Standings from './standings';
import Typography from '@material-ui/core/Typography';
import Timeline from './timeline';

const createLinksConfig = boardgames => [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings dataKey="trueskill" desc={<Typography variant="body1" gutterBottom>
    For each player, the first column represents μ (mu) and the second σ (sigma), based on the <a href="https://en.wikipedia.org/wiki/TrueSkill">TrueSkill</a> algorithm. <br />
    A player's skill is represented as a normal distribution N characterized by a mean value μ (mu, representing perceived skill) and a variance σ (sigma, representing how "unconfident" test system is in the player's μ value).
  </Typography>}/>
},{
  'text': 'Mu',
  'path': '/mu',
  'component': () => <Standings dataKey="mu" />
},{
  'text': 'Timeline',
  'path': '/timeline',
  'component': () => <Timeline />
},
...boardgames.map((d, i) => ({
  'text': d,
  'path': '/' + i,
  'component': () => <Standings boardgame={d} dataKey="trueskill" />
}))
];

const unique = col => [...new Set(col)];

const StandingsLinks = props => {
  const data = unique(props.standings.data.map(d => d.play.boardgame)).sort()
  const boardgames = createLinksConfig(data)

  return (
    <div>
      <Links charts={boardgames} title={"Standings"} key={"Wins"} open={true} />
      <Divider />
    </div>
  )
}

const StandingsContent = props => {
  const data = unique(props.standings.data.map(d => d.play.boardgame))
  const boardgames = createLinksConfig(data)

  return (
    boardgames.map(({path, component}) => (
      <Route key={path} path={path} exact component={component} />
    ))
  );
}

export {StandingsContent, StandingsLinks, StandingsImg};
