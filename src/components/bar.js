import React from 'react';
import Chartist from 'react-chartist';

const dflt = {
  stackBars: true,
  axisY: {
    labelInterpolationFnc: function (value) {
      return Number.isInteger(value) ? value : null;
    }
  },
  low: 0
};

const listener = (data) => {
  if (data.type === 'bar') {
    data.element.attr({
      style: 'stroke-width: 0px'
    });

    for (let s = 0; s < data.series.length; ++s) {
      if (data.seriesIndex === s) {
        data.element.animate({
          'stroke-width': {
            //begin: s * 500,
            begin: 0,
            dur: 0.5,
            from: 0,
            to: 40,
            fill: 'freeze'
          }
        }, false);
      }
    }
  }
}

export default props => {
  const {data, className, options = {}, draw = listener} = props;

  return (
    <Chartist
      data={data}
      options={{...dflt, ...options}}
      type={'Bar'}
      className={className}
      listener={{'draw': draw}}
    />
  );
}