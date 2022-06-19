import { createAsyncThunk } from '@reduxjs/toolkit'

const base = 'https://raw.githubusercontent.com/DictumMortuum/json-api/master'

export const fetchPlays = createAsyncThunk('plays', async () => {
  return await fetch(base + '/rest/v1/plays.json').then(res => res.json())
})

export const fetchRatings = createAsyncThunk('ratings', async () => {
  return await fetch(base + '/rest/v1/ratings.json').then(res => res.json())
})

export const fetchOverall = createAsyncThunk('overall', async () => {
  return await fetch(base + '/rest/v1/overall.json').then(res => res.json())
})

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
      return {
        ...state,
        ratings: [],
        overall: [],
        positions: getPositions([]),
        players: getPlayers([]),
        player: "",
        player_games: [],
        data: [],
        range: [0, 0]
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
    case "plays/fulfilled": {
      let plays = action.payload;
      let sorted = plays.sort(dateSort);
      return {
        ...state,
        positions: getPositions(plays),
        players: getPlayers(plays),
        player_games: sorted,
        data: sorted,
        range: [0, plays.length]
      }
    }
    case "ratings/fulfilled": {
      return {
        ...state,
        ratings: action.payload,
      }
    }
    case "overall/fulfilled": {
      return {
        ...state,
        overall: action.payload,
      }
    }
    default:
      return state
  }
};
