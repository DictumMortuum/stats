import React from 'react';
import Chartist from '../../Bar';
import { connect } from 'react-redux';
import { rate, Rating } from 'ts-trueskill';

const graph = ({data, players}) => {
  const ratings = {}

  players.map(player => {
    ratings[player] = new Rating()
  })

  data.map(({play, stats}) => {
    let game_participants = stats.map(stat => [ratings[stat.player]])
    let rated = rate(game_participants)

    console.log(play.boardgame)

    stats.map((stat, i) => {
      let new_rating = rated[i]
      console.log(i, "Updating", stat.player, "from", game_participants[i].toString(), "to", new_rating[0].toString())
      ratings[stat.player] = new_rating[0]
    })
  })

  const results = players.map(player => ({
    player,
    mu: ratings[player].mu.toFixed(3),
    sigma: ratings[player].sigma.toFixed(3)
  })).sort((a, b) => {
    return b.mu - a.mu
    // console.log(a.mu, b.mu, diff)

    // if (diff > 0.1 && diff < -0.1) {
    //   return diff
    // } else {
    //   return a.sigma - b.sigma
    // }
  })

  console.log(results)

  return {
    'labels': results.map(d => d.player),
    'series': [
      results.map(d => d.mu),
      results.map(d => d.sigma),
    ],
    'total': data.length,
    'sample': data.length
  };
};

const mapStateToProps = state => ({
  ...state.standingsReducer,
  options: {
    high: 35,
    seriesBarDistance: 40,
    stackBars: false
  },
  className: "ct-octave standalone"
});

class Element extends React.Component {
  render() {
    const args = {...this.props, data: graph(this.props)}
    return <Chartist {...args} />;
  }
}

export default connect(mapStateToProps)(Element);
