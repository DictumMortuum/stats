import React from 'react';
import Chartist from '../../Bar';
import tiles from '../tiles.json';
import { connect } from 'react-redux';

const graph = ({colors, games, players}) => {

  const I = colors.map(() => players.map(() => 0));

  const R = (acc, {setup}) => {
    setup.forEach(({tiles: _tiles, score, player}) => {
      _tiles.forEach(t => {
        let p = players.indexOf(player);
        let i = colors.indexOf(tiles[t].color);

        if(i > -1) {
          acc[i][p]++;
        }
      });
    });

    return acc;
  };


  return {
    'labels': players,
    'series': games.reduce(R, I),
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
  className: "ct-octave pyramids"
});

class Element extends React.Component {

  render() {
    const args = {...this.props, data: graph(this.props)}
    console.log(args.data.series);
    return <Chartist {...args} />;
  }
}

export default connect(mapStateToProps)(Element);
