import React from 'react';
import Chartist from './bar';
import common from './common';

const graph = ({data, players}) => {
  const Filter = ({winner}) => winner !== undefined;

  const Reduce = (acc, {winner}) => {
    let p = players.indexOf(winner);
    acc[p][p]++;
    return acc;
  }
  
  const Init = players.map(() => players.map(() => 0));

  return common({
    'labels': players,
    Reduce,
    Filter,
    Init,
    data
  });
};

export default props => (<Chartist data={graph(props)} className={"ct-octave players"} />);
