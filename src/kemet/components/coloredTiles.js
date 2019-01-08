import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';
import incrementalAverage from 'incremental-average';

const graph = color => ({ data, players, tiles }) => {

  const colored_tiles = tiles.filter(d => d.color === color).map(d => d.name);
  const stats = players.map(() => incrementalAverage());

  const Filter = ({ setup }) => setup !== undefined;

  const PositionReduce = (acc, { order, setup }) => {
    setup.forEach(({ tiles, position, player }) => {
      tiles.forEach(t => {
        let p = players.indexOf(player);
        let i = colored_tiles.indexOf(t);

        if(i > -1) {
          let ia = stats[p];
          acc[p][i] += ia.add(order.length - position);
        }
      });
    });
    return acc;
  };

  const VpReduce = (acc, { setup }) => {
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

  const PicksReduce = (acc, { setup }) => {
    setup.forEach(({ tiles, score, player }) => {
      tiles.forEach(t => {
        let p = players.indexOf(player);
        let i = colored_tiles.indexOf(t);

        if(i > -1) {
          acc[p][i]++;
        }
      });
    });
    return acc;
  };

  return {
    'labels': colored_tiles,
    PositionReduce,
    VpReduce,
    PicksReduce,
    Filter,
    Init: players.map(() => colored_tiles.map(() => 0)),
    data
  };
};

const TilesByPosition = color => props => {
  const data = graph(color)(props);

  return (
    <Chartist
      data={common({...data, Reduce: data.PositionReduce})}
      options={{ stackBars: false }}
      draw={() => 1}
      className={"ct-octave players"}
    />
  );
};

const TilesByVP = color => props => {
  const data = graph(color)(props);

  return (
    <Chartist
      data={common({...data, Reduce: data.VpReduce})}
      options={{ stackBars: false }}
      draw={() => 1}
      className={"ct-octave players"}
    />
  );
};

const TilesByPicks = color => props => {
  const data = graph(color)(props);

  console.log(data);

  return (
    <Chartist
      data={common({...data, Reduce: data.PicksReduce})}
      draw={() => 1}
      className={"ct-octave players"}
    />
  );
};

export {
  TilesByPosition,
  TilesByVP,
  TilesByPicks
};
