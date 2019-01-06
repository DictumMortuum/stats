import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';

const graph = ({data, players}) => {

  const Filter = ({setup}) => setup !== undefined;

  const Reduce = (acc, {setup}) => {

    setup.forEach(({player, position}) => {
      let p = players.indexOf(player);
      acc[position][p]++;
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
    className={"ct-octave"}
  />
);
