import React from 'react';
import Chartist from '../../Bar';
import { connect } from 'react-redux';
import incrementalAverage from 'incremental-average';

const graph = ({data, players, positions}) => {
  const Init = Array(positions).fill(0).map(() => players.map(() => incrementalAverage()));

  const Reduce = (acc, {stats}) => {
    stats.reverse().map((stat, position) => {
      let p = players.indexOf(stat.player);
      console.log(position, stat.player)
      acc[position][p].add(p)
    })

    return acc;
  };

  return {
    'labels': players,
    'series': data.reduce(Reduce, Init).map(d => d.map(v => v.getAverage())),
    'total': data.length,
    'sample': data.length
  };
};

const mapStateToProps = state => ({
  ...state.standingsReducer,
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
