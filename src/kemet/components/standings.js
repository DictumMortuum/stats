import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';
import winner from '../winner';

const graph = ({data, players}) => {

  const Filter = ({order, setup}) => order !== undefined && setup !== undefined;

  const Reduce = (acc, {order, setup}) => {

    winner(order, setup).forEach(({player}, i) => {
      let p = players.indexOf(player);
      console.log(player, i);
      acc[i][p]++;
    });

    return acc;
  };

  return common({
    'labels': players,
    Reduce,
    Filter,
    Init: Array(5).fill(0).map(() => players.map(() => 0)),
    data
  });
};

export default props => (
  <Chartist
    data={graph(props)}
    options={{stackBars: false}}
    draw={() => 1}
    className={"ct-octave players"}
  />
);
