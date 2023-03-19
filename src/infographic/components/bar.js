import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from '@material-ui/core';
import classes from './graph.css';

export default props => {
  const { desc } = props;
  let axis_x;
  let axis_y;
  let margin;

  if (props.layout === "vertical") {
    axis_x = <YAxis type="category" dataKey={props.name || "name"} />
    axis_y = <XAxis type="number" />
    margin = { left: 80 }
  } else {
    axis_x = <XAxis dataKey={props.name || "name"} />
    axis_y = <YAxis type="number" />
    margin = {}
  }

  return (
    <div style={{ width: '95%', height: '95%' }}>
      <Typography variant="h4" gutterBottom>{props.title || ""}</Typography>
      { desc && <Typography gutterBottom>
        {desc}
      </Typography>}
      <ResponsiveContainer width="95%" height="85%">
        <BarChart layout={props.layout || "horizontal"} className={classes.wrapper} data={props.data} margin={margin}>
          {props.dataKeys.map(k => <Bar key={k.dataKey} dataKey={k.dataKey} fill={k.color} stackId={k.stack || null} />)}
          {axis_x}
          {axis_y}
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
