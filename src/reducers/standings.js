import data from '../standings/plays.json';

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

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        positions: getPositions(data),
        players: getPlayers(data),
        data,
        range: [0, data.length]
      }
    case "RANGE":
      return {
        ...state,
        range: [0, action.limit]
      }
    default:
      return state
  }
};
