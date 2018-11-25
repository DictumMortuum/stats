
import React from 'react';
import Chartist from './bar';
import common from './common';

const graph = ({data, players, boards}) => {
  const Filter = ({winner, board}) => winner !== undefined && board !== undefined;

  const Reduce = (acc, {board, winner}) => {
    let b = boards.indexOf(board);
    let p = players.indexOf(winner);
    acc[p][b]++;
    return acc;
  };
  
  const Init = players.map(() => boards.map(() => 0));

  return common({
    'labels': boards,
    Reduce,
    Filter,
    Init,
    data
  });
};

export default props => (<Chartist data={graph(props)} className={"ct-octave players"} />);
