import React from 'react';
import Chartist from './bar';
import common from './common';

const graph = ({data, players, aggressives}) => {

  const Reduce = (acc, {winner, aggressive}) => {
    let j = aggressives.indexOf(aggressive);
    let i = players.indexOf(winner);
    acc[i][j]++;
    return acc;
  };

  return common({
    'labels': aggressives,
    Reduce,
    Filter: ({winner, aggressive}) => winner !== undefined && aggressive !== undefined,
    Init: players.map(() => aggressives.map(() => 0)),
    data
  });
};

export default props => (<Chartist data={graph(props)} className={"ct-octave players"} />);
