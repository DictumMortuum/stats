import React from 'react';
import {countries, boards} from './scythe.json';
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
import common from './analysis';

const charts = [{
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
  'text': 'Country frequency',
  'path': '/scythe/country/frequency/',
  'component': () => <CountryFrequency {...common} />
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
  'text': 'Board frequency',
  'path': '/scythe/board/frequency',
  'component': () => <BoardFrequency {...common} />
}, {
  'text': 'Wins by stars',
  'path': '/scythe/stars/',
  'component': () => <WinsByStars {...common} />
}];

countries.forEach(c => {
  const Country = WinsByCombination(c);

  charts.push({
    'text': 'Wins by ' + c,
    'path': '/scythe/' + c + '/',
    'component': () => <Country {...common} />
  });
});

boards.forEach(c => {
  const Board = WinsByCombination2(c);

  charts.push({
    'text': 'Wins by ' + c,
    'path': '/scythe/' + c + '/',
    'component': () => <Board {...common} />
  });
});

export default charts;