import React from 'react';
import Chartist from './pie';

const graph = ({data, countries, relativeFrequency}) => ({
  'series': relativeFrequency(countries)(data.map(x => x.country)),
  'labels': countries
});

export default props => (<Chartist data={graph(props)} className={'ct-octave countries'} />);
