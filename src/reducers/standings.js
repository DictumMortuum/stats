import data from '../standings/plays.json';
import ratings from '../standings/ratings.json';
import overall from '../standings/overall.json';

const getPositions = data => Math.max(...data.map(d => d.stats.length))

const getPlayers = data => {
  let rs = []

  data.map(play => play.stats).flat().map(p => {
    rs[p.player_id] = {
      "name": p.player,
      "id": p.player_id,
      "plays": 0
    }

    return rs[p.player_id]
  })

  return rs
}

const dateSort = (a, b) => {
  let diff = new Date(b.date) - new Date(a.date)
  if (diff === 0) {
    return b.id - a.id
  } else {
    return diff
  }
}

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      let sorted = data.sort(dateSort)
      return {
        ...state,
        ratings,
        overall,
        positions: getPositions(data),
        players: getPlayers(data),
        player: "",
        player_games: sorted,
        data: sorted,
        range: [0, data.length]
      }
    case "RANGE":
      return {
        ...state,
        range: [...action.limit]
      }
    case "SET_PLAYER":
      let player_games;
      if (action.player === "") {
        player_games = state.data
      } else {
        player_games = state.data.filter(d => {
          const players = d.stats.map(s => s.player).filter(s => s === action.player)
          return players.length > 0
        })
      }

      return {
        ...state,
        player: action.player,
        player_games
      }
    default:
      return state
  }
};
