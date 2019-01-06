import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from "react-router-dom";
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
import Generator from './components/generator';
import common from './analysis';
import ScytheImg from './img.jpg';

const {countries, boards} = common;

const wins = [{
  'text': 'Wins by player',
  'path': '/',
  'component': () => <WinsByPlayer {...common} />
}, {
  'text': 'Average winning points',
  'path': '/average/',
  'component': () => <AverageWinningPoints {...common} />
}, {
  'text': 'Player sweetspot',
  'path': '/sweetspot/',
  'component': () => <Sweetspot {...common} />
}, {
  'text': 'Wins by country',
  'path': '/country/',
  'component': () => <WinsByCountry {...common} />
}, {
  'text': 'Wins by objectives',
  'path': '/objectives/',
  'component': () => <WinsByObjectives {...common} />
}, {
  'text': 'Wins by rounds',
  'path': '/rounds/',
  'component': () => <WinsByRounds {...common} />
}, {
  'text': 'Wins by board',
  'path': '/board/',
  'component': () => <WinsByBoard {...common} />
}, {
  'text': 'Wins by stars',
  'path': '/stars/',
  'component': () => <WinsByStars {...common} />
}];

const frequencies = [{
  'text': 'Country frequency',
  'path': '/country/frequency/',
  'component': () => <CountryFrequency {...common} />
}, {
  'text': 'Board frequency',
  'path': '/board/frequency/',
  'component': () => <BoardFrequency {...common} />
}];

const windgambit = [{
  'text': 'Resolution tiles',
  'path': '/resolution/',
  'component': () => <Resolution {...common} />
}, {
  'text': 'Aggressive tiles',
  'path': '/windgambit/aggressive/',
  'component': () => <Aggressive {...common} />
}, {
  'text': 'Passive tiles',
  'path': '/windgambit/passive/',
  'component': () => <Passive {...common} />
}];

const generator = [{
  'text': 'Generator',
  'path': '/generator/',
  'component': () => <Generator {...common} />
}];

const countryCombination = countries.map(c => {
  const Country = WinsByCombination(c);

  return {
    'text': 'Wins by ' + c,
    'path': '/' + c + '/',
    'component': () => <Country {...common} />
  };
});

const boardCombination = boards.map(c => {
  const Board = WinsByCombination2(c);

  return {
    'text': 'Wins by ' + c,
    'path': '/' + c + '/',
    'component': () => <Board {...common} />
  };
});

const ScytheLinks = () => (
  <div>
    <Links charts={wins} title={"General Stats"} key={"Wins"} open={true} />
    <Divider />
    <Links charts={windgambit} title={"Wind Gambit"} key={"Wind Gambit"} />
    <Divider />
    <Links charts={frequencies} title={"Frequencies"} key={"Frequencies"} />
    <Divider />
    <Links charts={countryCombination} title={"Country Combinations"} key={"Country combinations"} />
    <Divider />
    <Links charts={boardCombination} title={"Board Combinations"} key={"Board combinations"} />
    <Divider />
    <Links charts={generator} title={"Tools"} key={"Generator"} />
  </div>
);

const ScytheContent = () => (
  [...wins, ...frequencies, ...windgambit, ...countryCombination, ...boardCombination, ...generator].map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {ScytheContent, ScytheLinks, ScytheImg};