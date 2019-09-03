import React from 'react';
import Chartist from '../../Bar';
import { connect } from 'react-redux';
import incrementalAverage from 'incremental-average';

const graph = ({games, colors}) => {
  const Init = Array(2).fill(0).map(() => colors.map(() => incrementalAverage()));

  const Reduce = (acc, {player1, player2}) => {
    [player1, player2].forEach(player => {
      colors.forEach((color, i) => {
        let {won} = player;
        acc[0][i].add(player[colors[i]] || 0);

        if (won) {
          acc[1][i].add(player[colors[i]] || 0);
        }
      });
    });

    return acc;
  };

  return {
    'labels': colors,
    'series': games.reduce(Reduce, Init).map(d => d.map(v => v.getAverage())),
    'total': games.length,
    'sample': games.length
  };
};

const mapStateToProps = state => ({
  ...state.duelReducer,
  draw: () => 1,
  options: {
    stackBars: false
  },
  className: "ct-octave duel"
});

class Element extends React.Component {

  render() {
    const args = {...this.props, data: graph(this.props)}
    return <Chartist {...args} />;
  }
}

export default connect(mapStateToProps)(Element);
