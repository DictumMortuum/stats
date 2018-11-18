'use strict';

module.exports = ({data, players, objectives}) => {
  const Filter = ({winner, objectives}) => winner !== undefined && objectives !== undefined;

  const Reduce = (acc, {winner, objectives}) => {
    objectives.forEach(d => {
      let o = objectives.indexOf(d);
      let p = players.indexOf(winner);
      acc[p][o]++;
    });
  
    return acc;
  };
  
  const Init = players.map(() => objectives.map(() => 0));

  return {
    'series': data.filter(Filter).reduce(Reduce, Init),
    'labels': objectives,
    'desc': 'Wins by objectives'
  };
};
