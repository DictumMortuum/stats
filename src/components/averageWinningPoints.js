import React from 'react';
import incrementalAverage from 'incremental-average';
import Chartist from './bar';
import common from './common';

const graph = ({data, players}) => {
  const stats = players.map(() => incrementalAverage());

  const Filter = ({winner, points}) => winner !== undefined && points !== undefined;
  
  const Reduce = (acc, {winner, points}) => {
    let p = players.indexOf(winner);
    let ia = stats[p];
    acc[p][p] = ia.add(points);
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
