import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';

const graph = ({data, players, countries}) => {
  const Filter = ({winner, country}) => winner !== undefined && country !== undefined;

  const Reduce = (acc, {country, winner}) => {
    let c = countries.indexOf(country);
    let p = players.indexOf(winner);
    acc[p][c]++;
    return acc;
  };
  
  const Init = players.map(() => countries.map(() => 0));

  return common({
    'labels': countries,
    Reduce,
    Filter,
    Init,
    data
  });
};

export default props => (<Chartist data={graph(props)} className={"ct-octave players"} />);
