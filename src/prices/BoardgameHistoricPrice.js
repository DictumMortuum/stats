import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { stockFilter, storeFilter } from '../reducers/prices';
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

const maxMinAvg = (arr) => {
  var max = arr[0].price;
  var min = arr[0].price;
  var sum = arr[0].price;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i].price > max) {
      max = arr[i].price;
    }
    if (arr[i].price < min) {
      min = arr[i].price;
    }
    sum = sum + arr[i].price;
  }

  return {
    max: parseFloat(max.toFixed(2)),
    min: parseFloat(min.toFixed(2)),
    avg: parseFloat((sum/arr.length).toFixed(2))
  }
}

const transform = data => {
  const rs = {};

  data.map(d => {
    if(rs[d.cr_date] === undefined) {
      rs[d.cr_date] = [];
    }

    rs[d.cr_date].push(d)

    return d
  })

  const retval = [];

  for(let k in rs) {
    const date = new Date(k)
    const { avg, min, max } = maxMinAvg(rs[k])

    retval.push({
      avg,
      range: [min, max],
      cr_date: date.valueOf(),
    })
  }

  return retval
}

const formatDate = d => {
  const date = new Date(d)
  return date.getDate() + "/" + (date.getMonth() + 1)
}

const formatLabel = d => {
  const date = new Date(d)
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

const domain = col => {
  if(col.length === 0) {
    return []
  } else {
    return [col[0].cr_date - 43200000, col[col.length-1].cr_date + 43200000]
  }
}

export default props => {
  const classes = useStyles();
  const { history } = props;
  const { store, instock } = useSelector(state => state.pricesReducer)
  const p = history.filter(stockFilter(instock)).filter(storeFilter(store))
  const processed = transform(p).sort((a, b) => a.cr_date > b.cr_date)

  return (
     <Paper className={classes.root}>
      <Typography variant="body1" color="inherit" className={classes.label}>
        Price history
      </Typography>
      <ResponsiveContainer width="100%" height={200} >
        <ComposedChart data={processed}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="cr_date" scale="time" type="number" domain={domain(processed)} tickFormatter={formatDate} />
          <YAxis domain={['auto', 'auto']} type="number" />
          <Tooltip labelFormatter={formatLabel} />
          <Area type="monotone" dataKey="range" fillOpacity={0.3} fill="#5e81ac" />
          <Line type="monotone" dataKey="avg" stroke="#bf616a" strokeWidth={3} activeDot={{ r: 8 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  )
}
