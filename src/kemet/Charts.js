import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from "react-router-dom";
import analysis from "./analysis";
import KemetImg from './img.jpg';
import Standings from "./components/standings";
import TilesByVP from "./components/tilesByVP";
import TilesByPosition from './components/tilesByPosition';

const colors = ['red', 'blue', 'white'];

const tiles = [
  ...colors.map(c => {
    const Tiles = TilesByVP(c);

    return {
      'text': c + ' tiles by VP',
      'path': '/tiles/vp/' + c + '/',
      'component': () => <Tiles {...analysis} />
    };
  }),
  ...colors.map(c => {
    const Tiles = TilesByPosition(c);

    return {
      'text': c + ' tiles by position',
      'path': '/tiles/position/' + c + '/',
      'component': () => <Tiles {...analysis} />
    };
  })
];

const wins = [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings {...analysis} />
}];

const KemetLinks = () => (
  <div>
    <Links charts={wins} title={"General Stats"} key={"Wins"} open={true} />
    <Divider />
    <Links charts={tiles} title={"Tile Stats"} key={"tiles"} open={true} />
    <Divider />
  </div>
);

const KemetContent = () => (
  [...wins, ...tiles].map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {KemetContent, KemetLinks, KemetImg};
