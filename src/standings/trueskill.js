import React from 'react';
import LineChart from '../infographic/components/line';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
// const nord = ["#2E3440", "#3B4252", "#88C0D0", "#2E3440", "#3B4252", "#D8DEE9", "#A3BE8C", "#81A1C1", "#2E3440", "#D8DEE9"];

const nord = ["#2e3440", "#bf616a", "#5e81ac", "#ebcb8b", "#a3be8c", "#b48ead", "#8fbcbb"]

const dateFormat = date => {
  const d = new Date(date)
  return d.getFullYear() + "/" + (d.getMonth() + 1)
}

const transform = (data, player) => {
  const players = [];
  const rs = {};
  const cur_date = new Date();

  for(let i = 2017; i <= cur_date.getFullYear(); i++) {
    for(let j = 1; j <= 12; j++) {
      const d = new Date(i, j, 0)
      if(d <= cur_date) {
        rs[i + "/" + j] = {}
      }
    }
  }

  data.filter(d => d.boardgame_data.cooperative !== true).sort((a, b) => a.date >= b.date).map(d => {
    d.stats.map(s => {
      const date = dateFormat(d.date)

      if (rs[date] === undefined) {
        rs[date] = {}
      }

      rs[date][s.player] = s.trueskill.toFixed(2)
      players.push(s.player)

      return s
    })

    return d
  })

  const freq = players.reduce((obj, b) => {
    obj[b] = ++obj[b] || 1;
    return obj
  }, {})

  const tmp = [];

  for (let key in rs) {
    tmp.push({
      ...rs[key],
      name: key,
    })
  }

  let keys;
  if (player === "") {
    keys = [...new Set(players)].filter(d => freq[d] > 20)
  } else {
    keys = [player]
  }

  return {
    data: tmp,
    keys: keys.map((d, i) => ({dataKey: d, color: nord[i%nord.length]}))
  }
}

const TrueskillByTime = () => {
  const { data: json, player } = useSelector(state => state.standingsReducer)
  const { data, keys } = transform(json, player)

  return (
    <Grid container alignContent="center" alignItems="center" >
      <Grid item xs={false} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <LineChart data={data} dataKeys={keys} domain={[0, 30]} itemSorter={item => parseFloat(item.value) * -1} />
      </Grid>
      <Grid item xs={false} md={2}></Grid>
    </Grid>
  )
}

export default TrueskillByTime
