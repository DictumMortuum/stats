import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from "react-router-dom";
import Standings from "./components/standings";
import analysis from "./analysis";
import KemetImg from './img.jpg';

const wins = [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings {...analysis} />
}];

const KemetLinks = () => (
  <div>
    <Links charts={wins} title={"General Stats"} key={"Wins"} open={true} />
    <Divider />
  </div>
);

const KemetContent = () => (
  [...wins].map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {KemetContent, KemetLinks, KemetImg};
