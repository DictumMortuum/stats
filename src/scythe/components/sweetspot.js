import React from 'react';
import incrementalAverage from 'incremental-average';
import Typography from '@material-ui/core/Typography';
import Chartist from '../../Bar';
import common from '../../Template';

const graph = ({data, players, rounds: r, points: p, percentile}) => {

  const max_points = parseInt(p.slice(-1)) + 1;

  const percentileRounds = [...Array(r[0]).fill(0), ...percentile(r).reverse()];
  const percentilePoints = percentile(Array(max_points));
  const percentileObjectives = [0, ...percentile(Array(6)).reverse()];

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

  return common({
    'labels': players,
    Reduce,
    Filter,
    Init: players.map(() => players.map(() => 0)),
    data
  });
};

const options = {
  stackBars: false,
  high: 100
};

export default props => (
  <div>
    <Chartist
      data={graph(props)}
      options={options}
      draw={() => 1}
      className={"ct-octave players"} 
    />
    <Typography paragraph>
      <b>1st bar: round sweetspot.</b> The higher the score, the earlier does this player end the game.
    </Typography>
    <Typography paragraph>
      <b>2nd bar: points sweetspot.</b> The higher the score, the more the player scores on average.
    </Typography>
    <Typography paragraph>
      <b>3rd bar: objectives sweetspot.</b> The higher the score, the more time this player wins with less than 6 objectives.
    </Typography>
  </div>
);
