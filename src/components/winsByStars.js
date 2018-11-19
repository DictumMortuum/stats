import React from 'react';
import Chartist from './chart';

const graph = ({data, players}) => {
  const Filter = ({winner, objectives}) => winner !== undefined && objectives !== undefined;

  const Reduce = (acc, {winner, objectives}) => {
    let o = objectives.length - 1;
    let p = players.indexOf(winner);
    acc[p][o]++;
    return acc;
  };
  
  const Init = players.map(() => Array(6).fill(0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': Array(6).fill(0).map((_, i) => i + 1)
  };
};

export default props => (<Chartist data={graph(props)} />);