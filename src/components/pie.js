import React from 'react';
import Chartist from 'react-chartist';

export default ({data, className}) => (
  <Chartist data={data} type={'Pie'} className={className} />
);
