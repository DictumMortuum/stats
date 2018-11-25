import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { Route, Link } from "react-router-dom";
import AverageWinningPoints from './components/averageWinningPoints';
import WinsByBoard from './components/winsByBoard';
import WinsByCombination from './components/winsByCombination';
import WinsByCombination2 from './components/winsByCombination2';
import WinsByCountry from './components/winsByCountry';
import WinsByObjectives from './components/winsByObjectives';
import WinsByRounds from './components/winsByRounds';
import WinsByPlayer from './components/winsByPlayer';
import WinsByStars from './components/winsByStars';
import CountryFrequency from './components/countryFrequency';
import BoardFrequency from './components/boardFrequency';
import Sweetspot from './components/sweetspot';
import Resolution from './components/resolution';
import Passive from './components/passive';
import Aggressive from './components/aggressive';
import common from './analysis';

const {countries, boards} = common;

const wins = [{
  'text': 'Wins by player',
  'path': '/scythe/',
  'component': () => <WinsByPlayer {...common} />
}, {
  'text': 'Average winning points',
  'path': '/scythe/average/',
  'component': () => <AverageWinningPoints {...common} />
}, {
  'text': 'Player sweetspot',
  'path': '/scythe/sweetspot/',
  'component': () => <Sweetspot {...common} />
}, {
  'text': 'Wins by country',
  'path': '/scythe/country/',
  'component': () => <WinsByCountry {...common} />
}, {
  'text': 'Wins by objectives',
  'path': '/scythe/objectives/',
  'component': () => <WinsByObjectives {...common} />
}, {
  'text': 'Wins by rounds',
  'path': '/scythe/rounds/',
  'component': () => <WinsByRounds {...common} />
}, {
  'text': 'Wins by board',
  'path': '/scythe/board/',
  'component': () => <WinsByBoard {...common} />
}, {
  'text': 'Wins by stars',
  'path': '/scythe/stars/',
  'component': () => <WinsByStars {...common} />
}];

const frequencies = [{
  'text': 'Country frequency',
  'path': '/scythe/country/frequency/',
  'component': () => <CountryFrequency {...common} />
}, {
  'text': 'Board frequency',
  'path': '/scythe/board/frequency/',
  'component': () => <BoardFrequency {...common} />
}];

const windgambit = [{
  'text': 'Resolution tiles',
  'path': '/scythe/resolution/',
  'component': () => <Resolution {...common} />
}, {
  'text': 'Aggressive tiles',
  'path': '/scythe/windgambit/aggressive/',
  'component': () => <Aggressive {...common} />
}, {
  'text': 'Passive tiles',
  'path': '/scythe/windgambit/passive/',
  'component': () => <Passive {...common}/>
}];

const countryCombination = countries.map(c => {
  const Country = WinsByCombination(c);

  return {
    'text': 'Wins by ' + c,
    'path': '/scythe/' + c + '/',
    'component': () => <Country {...common} />
  };
});

const boardCombination = boards.map(c => {
  const Board = WinsByCombination2(c);

  return {
    'text': 'Wins by ' + c,
    'path': '/scythe/' + c + '/',
    'component': () => <Board {...common} />
  };
});

const Links = ({title, charts}) => (
  <List
    component="nav"
    subheader={<ListSubheader component="div">{title}</ListSubheader>}
  >
  {charts.map(({path, text}) => (
    <Link key={path} to={path} style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  ))}
  </List>
);

const ChartLinks = () => (
  <div>
    <Links charts={wins} title={"Wins"} key={"Wins"} />
    <Divider />
    <Links charts={windgambit} title={"Wind Gambit"} key={"Wind Gambit"} />
    <Divider />
    <Links charts={frequencies} title={"Frequencies"} key={"Frequencies"} />
    <Divider />
    <Links charts={countryCombination} title={"Country combinations"} key={"Country combinations"} />
    <Divider />
    <Links charts={boardCombination} title={"Board combinations"} key={"Board combinations"} />
  </div>
);

const ChartContent = () => (
  [...wins, ...frequencies, ...windgambit, ...countryCombination, ...boardCombination].map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {ChartContent, ChartLinks};