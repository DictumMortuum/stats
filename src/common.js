import React from 'react';
import info from './scythe.json';
import data from './plays.json';
import AverageWinningPoints from './components/averageWinningPoints';
import WinsByBoard from './components/winsByBoard';
import WinsByCombination from './components/winsByCombination';
import WinsByCombination2 from './components/winsByCombination2';
import WinsByCountry from './components/winsByCountry';
import WinsByObjectives from './components/winsByObjectives';
import WinsByRounds from './components/winsByRounds';
import WinsByPlayer from './components/winsByPlayer';
import WinsByStars from './components/winsByStars';

const rounds = () => {
  let temp = data.filter(d => d.rounds).map(d => d.rounds);
  let distinct = [...new Set(temp)].sort();
  let low = distinct[0];
  let high = distinct.slice(-1);
  return Array(high - low + 1).fill(low).map((d, i) => d + i);
}

const common = {
  ...info,
  data,
  rounds: rounds()
};

const charts = [{
  'text': 'Wins by player',
  'path': '/scythe/',
  'component': () => <WinsByPlayer {...common} />
}, {
  'text': 'Average winning points',
  'path': '/scythe/average/',
  'component': () => <AverageWinningPoints {...common} />
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

common.countries.forEach(c => {
  const Country = WinsByCombination(c);

  charts.push({
    'text': 'Wins by ' + c,
    'path': '/scythe/' + c + '/',
    'component': () => <Country {...common} />
  });
});

common.boards.forEach(c => {
  const Board = WinsByCombination2(c);

  charts.push({
    'text': 'Wins by ' + c,
    'path': '/scythe/' + c + '/',
    'component': () => <Board {...common} />
  });
});

export default charts;