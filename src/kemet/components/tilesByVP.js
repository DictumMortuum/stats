import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';
import incrementalAverage from 'incremental-average';

const graph = color => ({ data, players, tiles }) => {

  const colored_tiles = tiles.filter(d => d.color === color).map(d => d.name);
  const stats = players.map(() => incrementalAverage());

  const Filter = ({ setup }) => setup !== undefined;

  const Reduce = (acc, { setup }) => {

    setup.forEach(({ tiles, score, player }) => {
      tiles.forEach(t => {
        let p = players.indexOf(player);
        let i = colored_tiles.indexOf(t);

        if(i > -1) {
          let ia = stats[p];
          acc[p][i] += ia.add(score);
        }
      });
    });

    return acc;
  };

  return common({
    'labels': colored_tiles,
    Reduce,
    Filter,
    Init: players.map(() => colored_tiles.map(() => 0)),
    data
  });
};

export default color => props => (
  <Chartist
    data={graph(color)(props)}
    options={{ stackBars: false }}
    draw={() => 1}
    className={"ct-octave players"}
  />
);
