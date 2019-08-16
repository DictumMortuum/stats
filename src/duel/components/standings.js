import React from 'react';
import Chartist from '../../Bar';
import { connect } from 'react-redux';

const graph = ({games, players}) => {
  const Init = Array(5).fill(0).map(() => players.map(() => 0));

  const Reduce = (acc, {setup}) => {
    setup.forEach(({player, position}) => {
      let p = players.indexOf(player);
      acc[position][p]++;
    });
    return acc;
  };

  return {
    'labels': players,
    'series': games.reduce(Reduce, Init),
    'total': games.length,
    'sample': games.length
  };
};

const mapStateToProps = state => ({
  ...state.duelReducer,
  options: {
    stackBars: false
  },
  draw: () => 1,
  className: "ct-octave"
});

class Element extends React.Component {

  render() {
    const args = {...this.props, data: graph(this.props)}
    return <Chartist {...args} />;
  }
}

export default connect(mapStateToProps)(Element);
