import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from "react-redux";
import StandingsLogo from './logo.png';
import Standings from './standings2';
import Timeline from './timeline';
import Trueskill from './trueskill';
import Links from '../components/game/Links';
import PlayerSelect from './components/PlayerSelect';

export default () => {
  const { ratings, overall } = useSelector(state => state.standingsReducer)

  return (
    <Switch>
      <Route exact path="/">
        <Standings dataKey="trueskill" {...overall[0]} />
      </Route>
      <Route exact path="/trueskill">
        <Trueskill />
      </Route>
      <Route exact path="/timeline">
        <Timeline />
      </Route>
      {ratings.map(d => (
        <Route key={d.id} exact path={`/${d.id}`}>
          <Standings dataKey="trueskill" {...d} />
        </Route>
      ))}
    </Switch>
  )
}

export const links = () => {
  const { ratings } = useSelector(state => state.standingsReducer)

  const links = [{
    "section": "Standings",
    "open": true,
    "items": [{
      'text': 'Standings',
      'path': '/',
    },
    {
      'text': 'Trueskill by time',
      'path': '/trueskill',
    },{
      'text': 'Timeline',
      'path': '/timeline',
    }]
  }, {
    "section": "Games",
    "items": [
      ...ratings.map(d => ({
        'text': d.name,
        'path': '/' + d.id,
      }))
    ]
  }]

  return links.map(d => (
    <Links key={d.section} title={d.section} charts={d.items} open={d.open} />
  ))
}

export const right = () => <PlayerSelect />

export {StandingsLogo};
