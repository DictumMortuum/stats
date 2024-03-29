import React from 'react';
import Chartist from '../../Bar';
import { connect } from 'react-redux';

const graph = ({games, players}) => {
  const Init = Array(3).fill(0).map(() => players.map(() => 0));

  const Reduce = (acc, {player1, player2, winner}) => {
    let p1 = players.indexOf(player1.player);
    let p2 = players.indexOf(player2.player);

    // win , tie, lose

    if (winner === 'tie') {
      acc[1][p1]++;
      acc[1][p2]++;
    } else if (winner === player1.player) {
      acc[0][p1]++;
      acc[2][p2]++;
    } else {
      acc[2][p1]++;
      acc[0][p2]++;
    }

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
  draw: () => 1,
  options: {
    stackBars: false
  },
  className: "ct-octave"
});

class Element extends React.Component {

  render() {
    const args = {...this.props, data: graph(this.props)}
    return <Chartist {...args} />;
  }
}

export default connect(mapStateToProps)(Element);
