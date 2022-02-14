import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';

const graph = ({base, data, players, boards}) => {
  const combinations = boards.map(d => base + ' ' + d);

  const Filter = ({winner, country, board}) => winner !== undefined && country === base && board !== undefined;

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

export default props => (<Chartist data={graph(props)} className={"ct-octave players"} />);
