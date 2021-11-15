import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import classes from './graph.css';

export default props => (
  <BarChart className={classes.wrapper} width={window.innerWidth/1.5} height={window.innerHeight/3} data={props.data}>
    {props.dataKeys.map(k => <Bar key={k.dataKey} dataKey={k.dataKey} fill={k.color} />)}
    <XAxis dataKey={props.name || "name"} />
    <YAxis type="number" />
    <Tooltip />
  </BarChart>
);
