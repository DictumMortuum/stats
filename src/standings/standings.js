import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rate, Rating } from 'ts-trueskill';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
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

export const graph = ({ data, players, boardgame, range }) => {
  const ratings = {}
  const plays = {}

  data = data.filter(d => d.boardgame_data.cooperative !== true).slice(range[0], range[1])

  if (boardgame !== undefined) {
    data = data.filter(d => d.boardgame === boardgame)
  }

  players.map(player => {
    plays[player.name] = 0
    ratings[player.name] = new Rating()
    return player[player.name]
  })

  console.groupCollapsed("Games")

  data.map(({ boardgame, stats }) => {
    let game_participants = stats.map(stat => [ratings[stat.player]])
    let rated = rate(game_participants)

    console.groupCollapsed(boardgame)

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
    'total': data.length,
    'sample': data.length
  };
};

const dataToMarks = data => {
  let obj = data.map(({ date }) => {
    let d = new Date(date)
    let y = d.getFullYear()
    return y
  }).reduce((rs, cur, i) => {
    if (rs[cur] === undefined) {
      rs[cur] = i
    }

    return rs
  }, {})

  return Object.keys(obj).map(d => ({
    value: obj[d],
    label: d.slice(2),
  }))
}

// const extractStats = data => {
//   const retval = [];
//   // const rs = flatten(data.map(d => d.stats)).map(d => {
//   //   retval[d.player_id] = {
//   //     trueskill: d.trueskill,
//   //     player: d.player,
//   //     surname: d.player_surname,
//   //   }
//   //   return d
//   // })
//   console.log(retval)
//   return retval.splice(1).sort((a, b) => a.trueskill < b.trueskill)
// }

const DateSlider = () => {
  const { range, data } = useSelector(state => state.standingsReducer)
  const dispatch = useDispatch()

  return (
    <Slider
      defaultValue={range}
      valueLabelDisplay="auto"
      step={1}
      marks={dataToMarks(data)}
      min={1}
      max={data.length}
      onChangeCommitted={(event, value) => {
        dispatch({
          type: "RANGE",
          limit: value
        })
      }}
    />
  )
}

export default props => {
  const data = useSelector(state => ({
    ...state.standingsReducer,
    open: state.configReducer.open,
    boardgame: props.boardgame,
  }))

  // const newdata = extractStats(data.data)

  const { dataKey } = props;
  const { results, sample } = graph(data)

  const sorted = results.sort((a, b) => {
    return b[dataKey] - a[dataKey]
  })

  console.log(sorted)

  let content = (
    <Typography gutterBottom>
      There are no data for the current index you have selected.
    </Typography>
  )

  if (sorted.length > 0) {
    let min = parseFloat(sorted[sorted.length-1][dataKey])
    let max = 36

    content = (
      <ResponsiveContainer width="95%" height={window.innerHeight - 250} >
        <BarChart data={sorted} layout="vertical" margin={{ top: 0, right: 0, left: 15, bottom: 0 }}>
          <XAxis type="number" domain={[dataMin => Math.floor(min < 0 ? -5 : 0), dataMax => Math.ceil(max)]} orientation="top" />
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

  return (
    <Grid container alignContent="center" alignItems="center" >
      <Grid item xs={false} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <Typography noWrap>{"Sample size: " + sample}</Typography>
        {content}
        <DateSlider />
      </Grid>
      <Grid item xs={false} md={2}></Grid>
    </Grid>
  )
}
