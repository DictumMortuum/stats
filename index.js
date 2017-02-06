$.getJSON('scythe.json', scythe => {
  const countries = ['Saxony', 'Rusviet', 'Nordic', 'Polania', 'Crimea'];
  const players = ['Dimitris', 'Panagiotis', 'Elena', 'Kostas', 'Kalliopi'];
  const boards = ['Industrial', 'Engineering', 'Patriotic', 'Mechanical', 'Agricultural'];

  function stackedBar(series, labels, data) {
    data.col = data.col || 'col2';
    $('.grid').append(Mustache.render(scythe.template, data))

    new Chartist.Bar('#chart' + data.id + ' > div', {
      labels: labels,
      series: series
    }, {
      stackBars: true,

      axisY: {
        labelInterpolationFnc: function(value) {
          return Number.isInteger(value) ? value : null;
        }
      }
    }).on('draw', function (data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 0px'
        });

        for (var s = 0; s < data.series.length; ++s) {
          if (data.seriesIndex === s) {
            data.element.animate({
              y2: {
                begin:  s * 500,
                dur:    500,
                from:   data.y1,
                to:     data.y2,
                easing: Chartist.Svg.Easing.easeOutSine
              },
              'stroke-width': {
                begin: s * 500,
                dur:   1,
                from:  0,
                to:    20,
                fill:  'freeze'
              }
            }, false);
          }
        }
      }
    });
  }

  function winsByCountry(acc, cur) {
    var c = countries.indexOf(cur.country);
    var p = players.indexOf(cur.winner);
    acc[p][c]++;
    return acc;
  }

  function winsByBoard(acc, cur) {
    var b = boards.indexOf(cur.board);
    var p = players.indexOf(cur.winner);
    acc[p][b]++;
    return acc;
  }

  function winsByPlayer(acc, cur) {
    var p = players.indexOf(cur.winner);
    acc[p][p]++;
    return acc;
  }

  function winStatistics(acc, cur) {
    var p = players.indexOf(cur.winner);
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

  function combinationOnCountry(id, country) {
    const combinations = countries.filter(d => d === country).map(
      (c) => boards.map((b) => c + ' ' + b)
    ).reduce(
      (acc, cur) => { cur.forEach((a) => acc.push(a)); return acc; }
    )

    function winsByCombinations(acc, cur) {
      var p = players.indexOf(cur.winner);
      var c = combinations.indexOf(cur.country + ' ' + cur.board);
      acc[p][c]++;
      return acc;
    }

    stackedBar(
      scythe.plays.reduce(winsByCombinations, players.map(() => combinations.map(() => 0))),
      combinations,
      { id: id, desc: 'Wins by ' +  country + ' combination' }
    )
  }

  stackedBar(
    scythe.plays.reduce(winsByPlayer, players.map(() => players.map(() => 0))),
    players, { id: 1, desc: 'Wins' }
  )

  stackedBar(
    scythe.plays.filter(d => d.points !== undefined)
    .reduce(winStatistics, players.map(() => [0, 0]))
    .reduce(averageWinPoints, players.map(() => players.map(() => 0))),
    players, { id: 2, desc: 'Average winning points' }
  )

  stackedBar(
    scythe.plays.reduce(winsByCountry, players.map(() => countries.map(() => 0))),
    countries, { id: 3, desc: 'Wins by country' }
  )

  stackedBar(
    scythe.plays.reduce(winsByBoard, players.map(() => boards.map(() => 0))),
    boards, { id: 4, desc: 'Wins by board' }
  )

  countries.forEach(
    (country, index) => combinationOnCountry(5 + index, country)
  )
})
