import React from 'react';
import Chartist from './chart';

const graph = ({data, players}) => {
  const Filter = ({winner}) => winner !== undefined;

  const Reduce = (acc, {winner}) => {
    let p = players.indexOf(winner);
    acc[p][p]++;
    return acc;
  }
  
  const Init = players.map(() => players.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': players
  };
};

export default props => (<Chartist data={graph(props)} />);
