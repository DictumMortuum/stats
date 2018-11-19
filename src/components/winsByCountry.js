import React from 'react';
import Chartist from './chart';

const graph = ({data, players, countries}) => {
  const Filter = ({winner, country}) => winner !== undefined && country !== undefined;

  const Reduce = (acc, {country, winner}) => {
    let c = countries.indexOf(country);
    let p = players.indexOf(winner);
    acc[p][c]++;
    return acc;
  };
  
  const Init = players.map(() => countries.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': countries
  };
};

export default props => (<Chartist data={graph(props)} />);
