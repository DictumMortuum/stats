import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import classes from './graph.css';

export default props => {
  return (
    <ResponsiveContainer width="100%" height={window.innerHeight - 150} >
      <LineChart className={classes.wrapper} data={props.data}>
        {props.dataKeys.map(k => <Line connectNulls type="monotone" key={k.dataKey} dataKey={k.dataKey} stroke={k.color} stackId={k.stack || null} />)}
        <XAxis dataKey="name"/>
        <YAxis domain={props.domain} />
        <Tooltip itemSorter={props.itemSorter}/>
        <CartesianGrid strokeDasharray="6" />
      </LineChart>
    </ResponsiveContainer>
  )
}
