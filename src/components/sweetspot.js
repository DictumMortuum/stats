import React from 'react';
import incrementalAverage from 'incremental-average';
import Chartist from './bar';

const graph = ({data, players, rounds: r, points: p, percentile}) => {

  const max_points = parseInt(p.slice(-1)) + 1;

  const percentileRounds = [...Array(r[0]).fill(0), ...percentile(r).reverse()];
  const percentilePoints = percentile(Array(max_points));
  const percentileObjectives = percentile(Array(7));

  console.log();

  const round_stats = players.map(() => incrementalAverage());
  const point_stats = players.map(() => incrementalAverage());
  const objective_stats = players.map(() => incrementalAverage());

  const Filter = ({
    winner,
    points,
    rounds,
    objectives
  }) => winner !== undefined && (points !== undefined || rounds !== undefined || objectives !== undefined);

  const Reduce = (acc, {winner, points, rounds, objectives}) => {
    let p = players.indexOf(winner);
    console.log(rounds, percentileRounds[rounds]);

    if (rounds !== undefined) {
      acc[0][p] = round_stats[p].add(percentileRounds[rounds]);
    }

    if (points !== undefined) {
      acc[1][p] = point_stats[p].add(percentilePoints[points]);
    }

    if (objectives !== undefined) {
      acc[2][p] = objective_stats[p].add(percentileObjectives[objectives.length]);
    }

    return acc;
  };

  const Init = players.map(() => players.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': players
  };
};

export default props => (<Chartist data={graph(props)} options={{stackBars: false}} draw={() => 1} className={"ct-octave players"} />);
