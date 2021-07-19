import React from 'react';
import Chartist from '../../Bar';
import common from '../../Template';
import tier from '../tiers.json';
import incrementalAverage from 'incremental-average';

const graph = ({data, players}) => {
  const stats = players.map(() => incrementalAverage());

  const Filter = ({winner, country, board}) => winner !== undefined && country !== undefined && board !== undefined;

  const Reduce = (acc, {winner, country, board}) => {
    let p = players.indexOf(winner);
    let rs = tier.filter(d => d.country === country && d.board === board)
    let ia = stats[p];

    if (rs.length > 0) {
      acc[p][p] = ia.add(rs[0].tier)
    } else {
      console.log(rs, country, board)
    }

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
