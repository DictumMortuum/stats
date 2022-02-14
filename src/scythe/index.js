import React from 'react';
import { Route, Switch } from "react-router-dom";
import AverageWinningPoints from './components/averageWinningPoints';
import WinsByBoard from './components/winsByBoard';
import WinsByCombination from './components/winsByCombination';
import WinsByCombination2 from './components/winsByCombination2';
import WinsByCountry from './components/winsByCountry';
import WinsByObjectives from './components/winsByObjectives';
import WinsByRounds from './components/winsByRounds';
import WinsByPlayer from './components/winsByPlayer';
import WinsByStars from './components/winsByStars';
import WinsByRank from './components/winsByRank';
import CountryFrequency from './components/countryFrequency';
import BoardFrequency from './components/boardFrequency';
import Sweetspot from './components/sweetspot';
import Resolution from './components/resolution';
import Passive from './components/passive';
import Aggressive from './components/aggressive';
import Generator from './components/generator';
import common from './analysis';
import ScytheLogo from './logo.jpg';

const {countries, boards} = common;

export const links = [{
  "section": "General Stats",
  "open": true,
  "items": [{
    'text': 'Wins by player',
    'path': '/',
  }, {
    'text': 'Average winning points',
    'path': '/average/',
  }, {
    'text': 'Player sweetspot',
    'path': '/sweetspot/',
  }, {
    'text': 'Wins by country',
    'path': '/country/',
  }, {
    'text': 'Wins by objectives',
    'path': '/objectives/',
  }, {
    'text': 'Average tier for wins',
    'path': '/tier/',
  }, {
    'text': 'Wins by rounds',
    'path': '/rounds/',
  }, {
    'text': 'Wins by board',
    'path': '/board/',
  }, {
    'text': 'Wins by stars',
    'path': '/stars/',
  }]
}, {
  "section": "Frequencies",
  "items": [{
    'text': 'Country frequency',
    'path': '/country/frequency/',
  }, {
    'text': 'Board frequency',
    'path': '/board/frequency/',
  }]
}, {
  "section": "Wind Gambit",
  "items": [{
    'text': 'Resolution tiles',
    'path': '/resolution/',
  }, {
    'text': 'Aggressive tiles',
    'path': '/windgambit/aggressive/',
  }, {
    'text': 'Passive tiles',
    'path': '/windgambit/passive/',
  }]
}, {
  "section": "Tools",
  "items": [{
    'text': 'Generator',
    'path': '/generator/',
  }]
}, {
  "section": "Country Combinations",
  "items": countries.map(c => {
    return {
      'text': 'Wins by ' + c,
      'path': '/' + c + '/',
    };
  })
}, {
  "section": "Board Combinations",
  "items": boards.map(c => {
    return {
      'text': 'Wins by ' + c,
      'path': '/' + c + '/',
    };
  })
}]

export default () => (
  <Switch>
    <Route exact path="/">
      <WinsByPlayer {...common} />
    </Route>
    <Route exact path="/average">
      <AverageWinningPoints {...common} />
    </Route>
    <Route exact path="/sweetspot">
      <Sweetspot {...common} />
    </Route>
    <Route exact path="/country">
      <WinsByCountry {...common} />
    </Route>
    <Route exact path="/objectives">
      <WinsByObjectives {...common} />
    </Route>
    <Route exact path="/objectives">
      <WinsByObjectives {...common} />
    </Route>
    <Route exact path="/tier">
      <WinsByRank {...common} />
    </Route>
    <Route exact path="/rounds">
      <WinsByRounds {...common} />
    </Route>
    <Route exact path="/board">
      <WinsByBoard {...common} />
    </Route>
    <Route exact path="/stars">
      <WinsByStars {...common} />
    </Route>
    <Route exact path="/country/frequency">
      <CountryFrequency {...common} />
    </Route>
    <Route exact path="/board/frequency">
      <BoardFrequency {...common} />
    </Route>
    <Route exact path="/resolution">
      <Resolution {...common} />
    </Route>
    <Route exact path="/windgambit/aggressive">
      <Aggressive {...common} />
    </Route>
    <Route exact path="/windgambit/passive">
      <Passive {...common} />
    </Route>
    <Route exact path="/generator">
      <Generator {...common} />
    </Route>
    {countries.map(c => (
      <Route key={c} exact path={`/${c}/`}>
        <WinsByCombination {...common} base={c} />
      </Route>
    ))}
    {boards.map(c => (
      <Route key={c} exact path={`/${c}/`}>
        <WinsByCombination2 {...common} base={c} />
      </Route>
    ))}
  </Switch>
)

export {ScytheLogo};
