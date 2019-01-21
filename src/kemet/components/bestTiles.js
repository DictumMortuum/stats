import React from 'react';
import Chartist from '../../Bar';
import { connect } from 'react-redux';
import incrementalAverage from 'incremental-average';

const n = 20;

const graph = ({games, players, tiles, config: {perPlayer}}) => {

  const data = tiles.map(d => d.name);

  const I = Array(2).fill(0).map(() => tiles.map(() => incrementalAverage()));

  const R = (acc, {setup}) => {
    setup.forEach(({tiles: _tiles, score, position}) => {
      _tiles.forEach(t => {
        let i = data.indexOf(t);

        if(i > -1) {
          acc[0][i].add(score);
          acc[1][i].add(position + 1);
        }
      });
    });

    return acc;
  };

  return {
    'labels': data,
    'series': games.reduce(R, I).map(d => d.map(v => v.getAverage())),
    'total': games.length,
    'sample': games.length
  };
};

const compare = (a, b) => {
  if (a.position > b.position) {
    return 1;
  } else if (a.position < b.position) {
    return -1;
  } else {
    return b.score - a.score;
  }
}

const sort = ({labels, sample, total, series: [first, second, ...rest]}) => {
  let merged = [];
  const labels_sorted = [];
  const first_sorted = [];
  const second_sorted = [];

  for (let i = 0; i < labels.length; i++) {
    merged.push({
      'label': labels[i],
      'score': first[i],
      'position': second[i]
    });
  }

  merged = merged.sort(compare).filter(d => d.score !== 0 && d.position !== 0);

  for (let i = 0; i < merged.length; i++) {
    labels_sorted[i] = merged[i].label;
    first_sorted[i] = merged[i].score;
    second_sorted[i] = merged[i].position;
  }

  return {
    labels: labels_sorted.slice(0, n),
    sample,
    total,
    series: [
      first_sorted.slice(0, n),
      second_sorted.slice(0, n)
    ]
  };
};

const mapStateToProps = state => ({
  ...state.kemetReducer,
  options: {
    stackBars: false
  },
  draw: () => 1,
  className: "ct-octave players"
});

class Element extends React.Component {
  render() {
    const data = graph(this.props);
    console.log(data);
    const args = {...this.props, data: sort(data)}
    console.log(args);
    return <Chartist {...args} />;
  }
}

export default connect(mapStateToProps)(Element);
