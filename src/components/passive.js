import React from 'react';
import Chartist from './bar';
import common from './common';

const graph = ({data, players, passives}) => {

  const Reduce = (acc, {winner, passive}) => {
    let j = passives.indexOf(passive);
    let i = players.indexOf(winner);
    acc[i][j]++;
    return acc;
  };

  return common({
    'labels': passives,
    Reduce,
    Filter: ({winner, passive}) => winner !== undefined && passive !== undefined,
    Init: players.map(() => passives.map(() => 0)),
    data
  });
};

export default props => (<Chartist data={graph(props)} className={"ct-octave players"} />);
