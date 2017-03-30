const fs = require('fs');
const obj = JSON.parse(fs.readFileSync('scythe.json', 'utf8'));
const countries = ['Rusviet', 'Polania', 'Crimea', 'Nordic', 'Saxony'];
const boards = ['Industrial', 'Engineering', 'Patriotic', 'Mechanical', 'Agricultural'];

let temp = {};

countries.map(
  c => boards.map(
    b => {
      temp[c] = temp[c] || {};
      temp[c][b] = 0;
    }
  )
);

obj.plays.map(p => {
  temp[p.country][p.board]++;
});

function normalize(x, max) {
  return (6*x/max)-3;
}

function max(x) {
  let retval = 0;

  for (let key in x) {
    if (x[key] > retval) {
      retval = x[key];
    }
  }

  return retval;
}

let result = {};

countries.map(
  c => boards.map(
    b => {
      result[c] = result[c] || {};
      result[c][b] = normalize(temp[c][b], max(temp[c]));
    }
  )
);

console.log(result);
