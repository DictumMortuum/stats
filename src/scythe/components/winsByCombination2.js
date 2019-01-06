import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';

const graph = base => ({data, players, countries}) => {
  const combinations = countries.map(d => d + ' ' + base);

  const Filter = ({winner, country, board}) => winner !== undefined && country !== undefined && board === base;

  const Reduce = (acc, {country, winner, board}) => {
    let p = players.indexOf(winner);
    let c = combinations.indexOf(country + ' ' + board);

    acc[p][c]++;
    return acc;
  };

  const Init = players.map(() => combinations.map(() => 0));

  return common({
    'labels': combinations,
    Reduce,
    Filter,
    Init,
    data
  });
};

export default base => props => (<Chartist data={graph(base)(props)} className={"ct-octave players"} />);
