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
  ReferenceLine,
  LabelList,
  ErrorBar
} from 'recharts';

const graph = ({ data, players, boardgame, dataKey }) => {
  const ratings = {}
  const plays = {}

  if (boardgame !== undefined) {
    data = data.filter(d => d.play.boardgame === boardgame)
  }

  players.map(player => {
    plays[player] = 0
    ratings[player] = new Rating()
    return player[player]
  })

  console.groupCollapsed("Games")

  data.map(({ play, stats }) => {
    let game_participants = stats.map(stat => [ratings[stat.player]])
    let rated = rate(game_participants)

    console.groupCollapsed(play.boardgame)

    stats.map((stat, i) => {
      let new_rating = rated[i]
      console.log(i, "Updating", stat.player, "from", game_participants[i].toString(), "to", new_rating[0].toString())
      ratings[stat.player] = new_rating[0]
      plays[stat.player]++
      return plays[stats.player]
    })

    console.groupEnd()
    return stats
  })

  console.groupEnd()

  const results = players.map(player => {
    let mu = parseFloat(ratings[player].mu.toFixed(3))
    let sigma = parseFloat(ratings[player].sigma.toFixed(3))

    return ({
      player,
      matches: plays[player],
      mu,
      sigma,
      error: [sigma, sigma],
      trueskill: (mu - (3 * sigma)).toFixed(3)
    })
  }).sort((a, b) => {
    return b[dataKey] - a[dataKey]
  }).filter(d => plays[d.player] !== 0)

  console.table(results)

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

const mapStateToProps = (state, props) => ({
  ...state.standingsReducer,
  open: state.configReducer.open,
  dataKey: props.dataKey,
})

class Element extends React.Component {
  render() {
    const { dataKey } = this.props
    const { results } = graph(this.props)

    return (
      <ResponsiveContainer width="95%" height={window.innerHeight - 150} >
        <BarChart data={results} layout="vertical" margin={{ top: 0, right: 0, left: 15, bottom: 0 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="player" stroke="black" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <ReferenceLine x={results[0].mu} stroke="red" strokeDasharray="3 3" />
          <Bar dataKey={dataKey} fill="#64b5f6">
            <LabelList dataKey={dataKey} position="insideLeft" />
            {dataKey==="mu" ? <ErrorBar dataKey="error" width={4} strokeWidth={2} /> : <div></div>}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default connect(mapStateToProps)(Element);
