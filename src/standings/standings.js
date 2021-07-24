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
    plays[player.name] = 0
    ratings[player.name] = new Rating()
    return player[player.name]
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
    let mu = parseFloat(ratings[player.name].mu.toFixed(3))
    let sigma = parseFloat(ratings[player.name].sigma.toFixed(3))

    return ({
      player: player.name,
      matches: plays[player.name],
      mu,
      sigma,
      error: [sigma, sigma],
      trueskill: (mu - (3 * sigma)).toFixed(3)
    })
  }).filter(d => plays[d.player] !== 0)

  console.table(results)

  return {
    results,
    dataKey,
    'total': data.length,
    'sample': data.length
  };
};

const mapStateToProps = (state, props) => ({
  ...state.standingsReducer,
  open: state.configReducer.open,
  dataKey: props.dataKey
})

class Element extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    const { sample, total } = graph(this.props)
    dispatch({
      type: "SET_MSG",
      msg: "Sample size: " + sample + " / " + total
    })
  }

  render() {
    const { dataKey, results } = graph(this.props)

    const sorted = results.sort((a, b) => {
      return b[dataKey] - a[dataKey]
    })

    let min = sorted[sorted.length-1][dataKey]
    let max = sorted[0][dataKey]

    return (
      <ResponsiveContainer width="95%" height={window.innerHeight - 150} >
        <BarChart data={sorted} layout="vertical" margin={{ top: 0, right: 0, left: 15, bottom: 0 }}>
          <XAxis type="number" domain={[dataMin => Math.floor(min < 0 ? min - 5 : 0), dataMax => Math.ceil(max + 5)]} orientation="top" />
          <YAxis type="category" dataKey="player" stroke="black" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <ReferenceLine x={sorted[0][dataKey]} stroke="red" strokeDasharray="3 3" />
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

// return (
//   <div style={{position: 'relative', width: '100%', paddingBottom: '1000px'}}>
//     <div
//       style={{
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         bottom: 0,
//         top: 0,
//       }}
//     >
//         <ResponsiveContainer height="95%">
//           <BarChart data={results} layout="vertical" margin={{ top: 0, right: 0, left: 15, bottom: 0 }}>
//             <XAxis type="number" orientation="top" />
//             <YAxis type="category" dataKey="player" stroke="black" />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Tooltip />
//             <ReferenceLine x={results[0].mu} stroke="red" strokeDasharray="3 3" />
//             <Bar dataKey={dataKey} fill="#64b5f6">
//               <LabelList dataKey={dataKey} position="insideLeft" />
//               {dataKey==="mu" ? <ErrorBar dataKey="error" width={4} strokeWidth={2} /> : <div></div>}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//   </div></div>

//       )
