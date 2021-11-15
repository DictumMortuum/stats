import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import classes from './graph.css';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, ...rest }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#eceff4" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {rest.name} - {rest.size}
    </text>
  );
};

export default props => (
  <PieChart className={classes.wrapper} width={window.innerWidth/1.5} height={window.innerHeight/1.5} >
    {props.dataKeys.map(k => (
      <Pie key={k.dataKey} data={props.data} dataKey={k.dataKey} fill={k.color[0]} label={renderCustomizedLabel}>
        {props.data.map((entry, i) => <Cell key={`cell-${i}`} fill={k.color[i % k.color.length]} />)}
      </Pie>
    ))}
  </PieChart>
);
