import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Tooltip,
  Area,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  label: {
    marginBottom: theme.spacing(1),
  }
}));

const transform = data => data.map(d => {
  const date = new Date(d.cr_date)

  return {
    cr_date: date.valueOf(),
    avg: parseFloat(d.avg.toFixed(2)),
    range: [parseFloat(d.min.toFixed(2)), parseFloat(d.max.toFixed(2))]
  }
})

const formatDate = d => {
  const date = new Date(d)
  return date.getDate() + "/" + (date.getMonth() + 1)
}

const formatLabel = d => {
  const date = new Date(d)
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

export default props => {
  const { data } = props;
  const classes = useStyles();
  let p = data.map(d => d.history)[0]
  const processed = transform(p)

  return (
    <Paper className={classes.root}>
      <Typography variant="body1" color="inherit" className={classes.label}>
        Price history
      </Typography>
      <ResponsiveContainer width="100%" height={200} >
        <ComposedChart data={processed}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="cr_date" scale="time" type="number" domain={[processed[0].cr_date - 43200000, processed[processed.length-1].cr_date + 43200000]} tickFormatter={formatDate} />
          <YAxis domain={['auto', 'auto']} type="number" />
          <Tooltip labelFormatter={formatLabel} />
          <Area type="monotone" dataKey="range" fillOpacity={0.3} fill="#5e81ac" />
          <Line type="monotone" dataKey="avg" stroke="#bf616a" strokeWidth={3} activeDot={{ r: 8 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  )
}
