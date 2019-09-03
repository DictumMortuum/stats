import React from 'react';
import Chartist from '../../Bar';
import { connect } from 'react-redux';
import incrementalAverage from 'incremental-average';

const graph = ({games, players}) => {
  const Init = Array(10).fill(0).map(() => players.map(() => incrementalAverage()));

  const Reduce = (acc, {player1, player2}) => {
    let p1 = players.indexOf(player1.player);
    let p2 = players.indexOf(player2.player);

    [{id: p1, ...player1}, {id: p2, ...player2}].forEach(({
      id, blue, green, yellow, purple, wonder, marker, coin, battle, pantheon = 0, temple = 0
    }) => {
      acc[0][id].add(blue);
      acc[1][id].add(green);
      acc[2][id].add(yellow);
      acc[3][id].add(purple);
      acc[4][id].add(wonder);
      acc[5][id].add(marker);
      acc[6][id].add(coin);
      acc[7][id].add(battle);
      acc[8][id].add(pantheon);
      acc[9][id].add(temple);
    });

    return acc;
  };

  return {
    'labels': players,
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
