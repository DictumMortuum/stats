/* global Mustache Chartist*/
$.getJSON('scythe.json', scythe => {
  const countries = ['Saxony', 'Rusviet', 'Nordic', 'Polania', 'Crimea', 'Albion', 'Togawa'];
  const players = ['Dimitris', 'Panagiotis', 'Elena', 'Kostas', 'Kalliopi', 'Giorgos'];
  const boards = ['Industrial', 'Engineering', 'Patriotic', 'Mechanical',
    'Agricultural', 'Innovative', 'Militant'];
  const objectives = ['Upgrade', 'Deploy', 'Build', 'Enlist', 'Worker',
    'Objective', 'Battle1', 'Battle2', 'Power', 'Popularity'];
  const r = scythe.plays.filter(d => d.rounds).map(d => d.rounds).sort()
    .filter((el, i, a) => i === a.indexOf(el));
  const rounds = Array(r.length).fill(r[0]).map((d, i) => d + i);

  function stackedBar(series, labels, data) {
    data.col = data.col || 'col2';
    $('.grid').append(Mustache.render(scythe.template, data));

    new Chartist.Bar('#chart' + data.id + ' > div', {
      labels: labels,
      series: series
    }, {
      stackBars: true,

      axisY: {
        labelInterpolationFnc: function (value) {
          return Number.isInteger(value) ? value : null;
        }
      }
    }).on('draw', function (data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 0px'
        });

        for (let s = 0; s < data.series.length; ++s) {
          if (data.seriesIndex === s) {
            data.element.animate({
              y2: {
                begin: s * 500,
                dur: 500,
                from: data.y1,
                to: data.y2,
                easing: Chartist.Svg.Easing.easeOutSine
              },
              'stroke-width': {
                begin: s * 500,
                dur: 1,
                from: 0,
                to: 20,
                fill: 'freeze'
              }
            }, false);
          }
        }
      }
    });
  }

  function winsByCountry(acc, cur) {
    let c = countries.indexOf(cur.country);
    let p = players.indexOf(cur.winner);
    acc[p][c]++;
    return acc;
  }

  function winsByObjectives(acc, cur) {
    let o;
    let p;

    cur.objectives.map(d => {
      o = objectives.indexOf(d);
      p = players.indexOf(cur.winner);
      acc[p][o]++;
    });

    return acc;
  }

  function winsByBoard(acc, cur) {
    let b = boards.indexOf(cur.board);
    let p = players.indexOf(cur.winner);
    acc[p][b]++;
    return acc;
  }

  function winsByPlayer(acc, cur) {
    let p = players.indexOf(cur.winner);
    acc[p][p]++;
    return acc;
  }

  function winStatistics(acc, cur) {
    let p = players.indexOf(cur.winner);
    acc[p][0] += cur.points;
    acc[p][1]++;
    return acc;
  }

  function averageWinPoints(acc, cur, p) {
    if (cur[1] > 0) {
      acc[p][p] = cur[0] / cur[1];
    }
    return acc;
  }

  function winsByRounds(acc, cur) {
    let r = rounds.indexOf(cur.rounds);
    let p = players.indexOf(cur.winner);
    acc[p][r]++;
    return acc;
  }

  function combinationOnCountry(id, country) {
    const combinations = countries.filter(d => d === country).map(
      (c) => boards.map((b) => c + ' ' + b)
    ).reduce(
      (acc, cur) => {
        cur.forEach((a) => acc.push(a)); return acc;
      }
    );

    function winsByCombinations(acc, cur) {
      let p = players.indexOf(cur.winner);
      let c = combinations.indexOf(cur.country + ' ' + cur.board);
      acc[p][c]++;
      return acc;
    }

    stackedBar(
      scythe.plays.filter(d => d.winner !== undefined)
      .reduce(winsByCombinations, players.map(() => combinations.map(() => 0))),
      combinations, { id: id, desc: 'Wins by ' + country + ' combination' }
    );
  }

  stackedBar(
    scythe.plays.filter(d => d.winner !== undefined)
    .reduce(winsByPlayer, players.map(() => players.map(() => 0))),
    players, { id: 1, desc: 'Wins' }
  );

  stackedBar(
    scythe.plays.filter(d => d.points !== undefined)
    .filter(d => d.winner !== undefined)
    .reduce(winStatistics, players.map(() => [0, 0]))
    .reduce(averageWinPoints, players.map(() => players.map(() => 0))),
    players, { id: 2, desc: 'Average winning points' }
  );

  stackedBar(
    scythe.plays.filter(d => d.winner !== undefined)
    .filter(d => d.rounds !== undefined)
    .reduce(winsByRounds, players.map(() => rounds.map(() => 0))),
    rounds, { id: 3, desc: 'Wins by rounds' }
  );

  stackedBar(
    scythe.plays.filter(d => d.winner !== undefined)
    .reduce(winsByCountry, players.map(() => countries.map(() => 0))),
    countries, { id: 4, desc: 'Wins by country' }
  );

  stackedBar(
    scythe.plays.filter(d => d.winner !== undefined)
    .reduce(winsByBoard, players.map(() => boards.map(() => 0))),
    boards, { id: 5, desc: 'Wins by board' }
  );

  stackedBar(
    scythe.plays.filter(d => d.winner !== undefined)
    .filter(d => d.objectives !== undefined)
    .reduce(winsByObjectives, players.map(() => objectives.map(() => 0))),
    objectives, { id: 6, desc: 'Wins by objectives' }
  );

  countries.forEach(
    (country, index) => combinationOnCountry(7 + index, country)
  );
});
