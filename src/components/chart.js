import React from 'react';
import Chartist from 'react-chartist';

const options = {
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

export default ({data}) => (
  <Chartist data={data} options={options} type={'Bar'} className={'ct-octave'} listener={{"draw": listener}} />
);
