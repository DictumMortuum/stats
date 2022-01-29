import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from 'react-router-dom';
import StandingsLogo from './logo.png';
import Standings from './standings';
import Typography from '@material-ui/core/Typography';
import Timeline from './timeline';
import Trueskill from './trueskill';
const unique = col => [...new Set(col)];

const createLinksConfig = ({ standings: { data }}) => {
  const boardgames = unique(data.map(d => d.boardgame)).sort()

  return {
    "general": [{
        'text': 'Standings',
        'path': '/',
        'component': () => <Standings dataKey="trueskill" desc={<Typography variant="body1" gutterBottom>
          For each player, the first column represents μ (mu) and the second σ (sigma), based on the <a href="https://en.wikipedia.org/wiki/TrueSkill">TrueSkill</a> algorithm. <br />
          A player's skill is represented as a normal distribution N characterized by a mean value μ (mu, representing perceived skill) and a variance σ (sigma, representing how "unconfident" test system is in the player's μ value).
        </Typography>}/>
      },
      // {
      //   'text': 'Mu',
      //   'path': '/mu',
      //   'component': () => <Standings dataKey="mu" />
      // },
      {
        'text': 'Trueskill by time',
        'path': '/trueskill',
        'component': () => <Trueskill />
      },{
        'text': 'Timeline',
        'path': '/timeline',
        'component': () => <Timeline />
      }
    ],
    "games": [
      ...boardgames.map((d, i) => ({
        'text': d,
        'path': '/' + i,
        'component': () => <Standings boardgame={d} dataKey="trueskill" />
      }))
    ]
  }
}

const StandingsLinks = props => {
  const {general, games} = createLinksConfig(props)

  return (
    <div>
      <Links charts={general} title={"Standings"} key={"Wins"} open={true} />
      <Divider />
      <Links charts={games} title={"Games"} key={"Games"} open={false} />
    </div>
  )
}

const StandingsContent = props => {
  const {general, games} = createLinksConfig(props)

  return (
    [...general, ...games].map(({path, component}) => (
      <Route key={path} path={path} exact component={component} />
    ))
  );
}

export {StandingsContent, StandingsLinks, StandingsLogo};
