import React from 'react';
import Chartist from '../../Bar';
import { connect } from 'react-redux';
import { sort } from './util';
import incrementalAverage from 'incremental-average';

const graph = ({games, players}) => {

  const I = players.map(() => incrementalAverage());

  const R = (acc, {setup}) => {
    setup.forEach(({player, position}) => {
      let p = players.indexOf(player);
      acc[p].add(position + 1);
    });

    return acc;
  };

  return {
    'labels': players,
    'series': [games.reduce(R, I).map(v => v.getAverage())],
    'total': games.length,
    'sample': games.length
  };
};

const mapStateToProps = state => ({
  ...state.kemetReducer,
  options: {
    stackBars: false
  },
  draw: () => 1,
  className: "ct-octave"
});

class Element extends React.Component {

  render() {
    const args = {...this.props, data: sort(graph(this.props), (a, b) => a.score - b.score)}
    return <Chartist {...args} />;
  }
}

export default connect(mapStateToProps)(Element);
