import React from 'react';
import Chartist from './bar';

const graph = ({data, players, objectives}) => {
  const Filter = ({winner, objectives}) => winner !== undefined && objectives !== undefined;

  const Reduce = (acc, {winner, objectives: _objectives}) => {
    _objectives.forEach(d => {
      let o = objectives.indexOf(d);
      let p = players.indexOf(winner);
      acc[p][o]++;
    });
  
    return acc;
  };
  
  const Init = players.map(() => objectives.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': objectives
  };
};

export default props => (<Chartist data={graph(props)} className={"ct-octave players"} />);