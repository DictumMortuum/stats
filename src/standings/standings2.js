import React from 'react';
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

export default props => {
  const { count, ratings, dataKey } = props;

  const fixed_ratings = ratings.map(d => ({
    ...d,
    trueskill: d.trueskill.toFixed(2),
  }))

  return (
    <Grid container alignContent="center" alignItems="center" >
      <Grid item xs={false} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <Typography noWrap>{"Sample size: " + count}</Typography>
        <ResponsiveContainer width="100%" height={window.innerHeight - 250}>
          <BarChart data={fixed_ratings} layout="vertical" margin={{ top: 0, right: 0, left: 15, bottom: 0 }}>
            <XAxis type="number" domain={[dataMin => 0, dataMax => 36]} orientation="top" />
            <YAxis type="category" dataKey="player" stroke="black" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <ReferenceLine x={fixed_ratings[0][dataKey]} stroke="red" strokeDasharray="3 3" />
            <Bar dataKey={dataKey} fill="#64b5f6">
              <LabelList dataKey={dataKey} position="insideLeft" />
              {dataKey==="mu" ? <ErrorBar dataKey="error" width={4} strokeWidth={2} /> : <div></div>}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={false} md={2}></Grid>
    </Grid>
  )
}
