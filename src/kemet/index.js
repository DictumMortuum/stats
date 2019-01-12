import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from 'react-router-dom';
import KemetImg from './img.jpg';
import PerPlayer from './components/config';
import Standings from './components/standings';
import TilesByPicks from './components/tilesByPicks';
import TilesByVP from './components/tilesByVP';
import TilesByPosition from './components/tilesByPosition';

const colors = ['red', 'blue', 'white'];

const tiles = [
  ...colors.map(c => ({
    'text': c + ' tiles by VP',
    'path': '/tiles/vp/' + c + '/',
    'component': () => <TilesByVP color={c} />
  })),
  ...colors.map(c => ({
    'text': c + ' tiles by position',
    'path': '/tiles/position/' + c + '/',
    'component': () => <TilesByPosition color={c} />
  })),
  ...colors.map(c => ({
    'text': c + ' tiles by # of picks',
    'path': '/tiles/picks/' + c + '/',
    'component': () => <TilesByPicks color={c} />
  }))
];

const wins = [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings />
}];

const KemetLinks = () => (
  <div>
    <Links charts={wins} title={"General Stats"} key={"Wins"} open={true} />
    <Divider />
    <Links charts={tiles} title={"Tile Stats"} key={"tiles"} open={true} />
    <Divider />
    <PerPlayer />
  </div>
);

const KemetContent = () => (
  [...wins, ...tiles].map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {KemetContent, KemetLinks, KemetImg};
