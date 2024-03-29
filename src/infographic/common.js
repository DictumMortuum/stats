export const year = data => y => data.filter(d => {
  let date = new Date(d.date)
  return date.getYear() + 1900 === y
})

export const up_to_year = data => y => data.filter(d => {
  let date = new Date(d.date)
  return date.getYear() + 1900 <= y
})

export const filterGamesOnPlayers = (players, data) => data.filter(d => {
  let ids = d.stats.map(d => d.player);
  console.log(ids);

  for(let i = 0; i < ids.length; i++) {
    if(!players.includes(ids[i])) {
      return false
    }
  }

  return true
})

export const sortPlayers = (a, b) => {
  return b.players - a.players
}

export const sortPlays = (a, b) => {
  return b.plays - a.plays
}

export const sortSize = (a, b) => {
  return a.size - b.size
}

export const sortName = (a, b) => {
  return b.name - a.name
}

export const sortTag = tag => (a, b) => {
  return b[tag] - a[tag]
}

export const sortTagDesc = tag => (a, b) => {
  return a[tag] - b[tag]
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export const getPlayers = json => {
  let rs = [];

  json.map(d => d.stats.map(stats => {
    rs.push(stats.player);
    return stats;
  }));

  return rs.filter(onlyUnique);
}

export const playsPerPlayer = json => {
  let data = {};

  json.map(d => d.stats.map(stats => {
    data[stats.player] === undefined ? data[stats.player] = 1 : data[stats.player]++
    return stats
  }))

  // delete data["Dimitris"]
  // delete data["Theoni"]

  let rs = [];

  Object.keys(data).map(d => {
    rs.push({
      name: d,
      plays: data[d]
    })

    return d
  })

  return rs.sort(sortPlays)
}

export const playsPerMonth = json => {
  let data = {};
  const options = { month: 'short' };

  json.map(d => {
    let date = new Date(d.date)
    const month = date.toLocaleDateString('el-GR', options)

    if (data[month] === undefined) {
      data[month] = {
        pair: 0,
        total: 0
      }
    }

    if (d.stats.length === 2) {
      const players = d.stats.map(d => d.player)

      if (players.includes("Dimitris") && players.includes("Theoni")) {
        data[month].pair++;
      } else {
        data[month].total++;
      }
    } else {
      data[month].total++;
    }

    return month
  })

  let rs = [];

  Object.keys(data).map(d => {
    rs.push({
      name: d,
      "ζευγάρι": data[d].pair,
      "παιχνίδια": data[d].total,
    })

    return d
  })

  return rs.reverse()
}

export const playsPerDay = json => {
  let data = {};
  const options = { weekday: 'short' };

  json.map(d => {
    let date = new Date(d.date)
    const day = date.toLocaleDateString('el-GR', options)

    if (data[day] === undefined) {
      data[day] = {
        pair: 0,
        total: 0
      }
    }

    if (d.stats.length === 2) {
      const players = d.stats.map(d => d.player)

      if (players.includes("Dimitris") && players.includes("Theoni")) {
        data[day].pair++;
      } else {
        data[day].total++;
      }
    } else {
      data[day].total++;
    }

    return day
  })

  let rs = [];

  [ "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ", "Κυρ"].map(d => {
    rs.push({
      name: d,
      "ζευγάρι": data[d] ? data[d].pair : 0,
      "παιχνίδια": data[d] ? data[d].total : 0,
    })

    return d
  })

  return rs
}

export const playsPerGame = json => {
  let data = {};

  json.map(d => {
    let boardgame = d.boardgame

    if (data[boardgame] === undefined) {
      data[boardgame] = {
        plays: 0,
        players: {}
      }
    }

    data[boardgame].plays++;

    d.stats.map(stat => data[boardgame].players[stat.player]=true)

    return data
  })

  let rs = [];

  Object.keys(data).map(d => {
    rs.push({
      name: d,
      "plays": data[d].plays,
      "players": Object.keys(data[d].players).length
    })

    return d
  })

  return rs.sort(sortPlays)
}

export const playersPerPlay = json => {
  let data = {};

  json.map(d => {
    let players = d.stats.length

    if (data[players] === undefined) {
      data[players] = {
        size: 0
      }
    }

    data[players].size++;

    return data
  })

  let rs = [];

  Object.keys(data).map(d => {
    rs.push({
      name: d + "p",
      "size": data[d].size
    })

    return d
  })

  return rs.sort(sortName)
}
