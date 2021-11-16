import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import classes from './graph.css';

export default props => {
  let axis_x;
  let axis_y;

  if (props.layout === "vertical") {
    axis_x = <YAxis type="category" dataKey={props.name || "name"} width={window.innerWidth/8} />
    axis_y = <XAxis type="number" />
  } else {
    axis_x = <XAxis dataKey={props.name || "name"} />
    axis_y = <YAxis type="number" />
  }

  return (
    <BarChart layout={props.layout || "horizontal"} className={classes.wrapper} width={window.innerWidth/1.5} height={window.innerHeight/3} data={props.data}>
      {props.dataKeys.map(k => <Bar key={k.dataKey} dataKey={k.dataKey} fill={k.color} stackId={k.stack || null} />)}
      {axis_x}
      {axis_y}
      <Tooltip />
    </BarChart>
  )
}
