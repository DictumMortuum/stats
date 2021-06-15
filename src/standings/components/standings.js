import React from 'react';
import { connect } from 'react-redux';
import { rate, Rating } from 'ts-trueskill';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Legend,
  ReferenceLine,
  LabelList
} from 'recharts';

const graph = ({data, players, boardgame}) => {
  const ratings = {}
  const plays = {}

  if (boardgame !== undefined) {
    data = data.filter(d => d.play.boardgame === boardgame)
  }

  players.map(player => {
    plays[player] = 0
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
      plays[stat.player]++
    })
  })

  const results = players.map(player => ({
    player,
    matches: plays[player],
    mu: ratings[player].mu.toFixed(3),
    sigma: ratings[player].sigma.toFixed(3)
  })).sort((a, b) => {
    return b.mu - a.mu
  }).filter(d => plays[d.player] !== 0)

  console.log(results)

  return {
    results,
    'labels': results.map(d => d.player + " " + plays[d.player] + "\n" + d.mu),
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
  open: state.configReducer.open,
  options: {
    high: 35,
    seriesBarDistance: 40,
    stackBars: false,
  },
  className: "ct-major-eleventh standalone"
})

class Element extends React.Component {
  render() {
    const { results } = graph(this.props)

    return (
      <ResponsiveContainer width="95%" height={window.innerHeight - 150} >
        <BarChart data={results} layout="vertical" margin={{ top: 5, right: 0, left: 15, bottom: 0 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="player" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <ReferenceLine x={results[0].mu} stroke="red" strokeDasharray="3 3" />
          <Bar dataKey="mu" fill="#8884d8">
            <LabelList dataKey="mu" position="insideRight" fill="white" />
          </Bar>
          <Bar dataKey="sigma" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default connect(mapStateToProps)(Element);
