/* global Mustache Chartist Tabletop*/
Tabletop.init({
  key: '1nzL1ZkFidReY5Xwyue_QONSLwh52HOGLiowAGgkDBc8',
  simplesheet: true,
  callback: s => {
    // Initial data transformations from google docs
    const sheet = s['Form responses 1'].elements.map(d => {
      d.rounds = Number(d.rounds);
      d.points = Number(d.points);
      return d;
    });

    $.getJSON('./scythe.json', scythe => {
      const countries = ['Rusviet', 'Polania', 'Crimea', 'Nordic', 'Saxony'];
      const boards = ['Industrial', 'Engineering', 'Patriotic', 'Mechanical', 'Agricultural'];
      const r = sheet.filter(d => d.rounds).map(d => d.rounds).sort()
        .filter((el, i, a) => i === a.indexOf(el));
      // If the rounds object has "holes", then chartist has a bug!
      // It doesn't render all the objects!
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

            for (let s = 0; s < data.series.length; s++) {
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

      function averageWinPoints(acc, cur, p) {
        if (cur[1] > 0) {
          acc[p][p] = cur[0] / cur[1];
        }
        return acc;
      }

      function winsByCountry(acc, cur) {
        let c = countries.indexOf(cur.country);
        acc[c][c]++;
        return acc;
      }

      function winsByBoard(acc, cur) {
        let b = boards.indexOf(cur.board);
        let c = countries.indexOf(cur.country);
        acc[c][b]++;
        return acc;
      }

      function winsByRounds(acc, cur) {
        let r = rounds.indexOf(cur.rounds);
        let c = countries.indexOf(cur.country);
        acc[c][r]++;
        return acc;
      }

      function winStatistics(acc, cur) {
        let c = countries.indexOf(cur.country);
        acc[c][0] += cur.points;
        acc[c][1]++;
        return acc;
      }

      stackedBar(
        sheet.reduce(winsByCountry, countries.map(() => countries.map(() => 0))),
        countries, { id: 1, desc: 'Wins' }
      );

      stackedBar(
        sheet.reduce(winsByBoard, countries.map(() => boards.map(() => 0))),
        boards, { id: 2, desc: 'Wins by board' }
      );

      stackedBar(
        sheet.filter(d => d.points)
        .reduce(winStatistics, countries.map(() => [0, 0]))
        .reduce(averageWinPoints, countries.map(() => countries.map(() => 0))),
        countries, { id: 3, desc: 'Average winning points' }
      );

      stackedBar(
        sheet.filter(d => d.rounds)
        .reduce(winsByRounds, countries.map(() => rounds.map(() => 0))),
        rounds, { id: 4, desc: 'Wins by rounds' }
      );
    });
  }
});
