import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';

const graph = ({data, players, resolutions}) => {

  const Reduce = (acc, {winner, resolution}) => {
    let r = resolutions.indexOf(resolution);
    let p = players.indexOf(winner);
    acc[p][r]++;
    return acc;
  };

  return common({
    'labels': resolutions,
    Reduce,
    Filter: ({winner, resolution}) => winner !== undefined && resolution !== undefined,
    Init: players.map(() => resolutions.map(() => 0)),
    data
  });
};

export default props => (<Chartist data={graph(props)} className={"ct-octave players"} />);
