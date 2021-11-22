import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Santa2021 from './year2021';

const years = [{
  "path": "/secretsanta/2021/task1",
  "component": Santa2021,
}];

const Year = ({path, component}) => <Route key={path} path={path} exact component={component} />

const SecretSanta = props => <Switch>{years.map(Year)}</Switch>

export default SecretSanta;
