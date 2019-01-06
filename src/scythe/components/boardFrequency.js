import React from 'react';
import Chartist from '../../Pie';

const graph = ({data, boards, relativeFrequency}) => ({
  'series': relativeFrequency(boards)(data.map(x => x.board)),
  'labels': boards
});

export default props => (<Chartist data={graph(props)} className={'ct-octave'} />);
