import data from '../standings/plays.json';
import {
  unique,
  flatten,
  collection
} from '../common';
import { rate, Rating } from 'ts-trueskill';

export const STANDINGS_INIT = 'STANDINGS_INIT';

const getPlayers = data => unique(flatten(collection(data)(d => d.stats.map(p => p.player))))

const getPositions = data => Math.max(...data.map(d => d.stats.length))

// returns an array of arrays, because I assume we don't play team games.
const statsToRatings = (state, stats) => stats.map(({ player }) => [state[player].rating])

const initPlays = players => players.reduce((plays, player) => ({
  ...plays,
  [player]: {
    "matches": 0,
    "name": player,
    "rating": new Rating()
  }
}), {})

// const initPlays = players => players.map(player => ({
//   "matches": 0,
//   "name": player,
//   "rating": new Rating()
// }))

const addStats = state => ({ play, stats }) => {
  let current_ratings = statsToRatings(state, stats)
  let new_ratings = rate(current_ratings)

  console.groupCollapsed(play.boardgame)

  stats.map((stat, i) => {
    let new_rating = new_ratings[i]
    console.log(i, "Updating", stat.player, "from", current_ratings[i].toString(), "to", new_rating[0].toString())
    state[stat.player].rating = new_rating[0]
    state[stat.player].matches++
    return state[stat.player]
  })

  console.groupEnd()

  return state
}

const calculateScore = state => state.map(key => {
  let player = state[key]
  let mu = parseFloat(player.rating.mu.toFixed(3))
  let sigma = parseFloat(player.rating.sigma.toFixed(3))

  return ({
    ...player,
    mu,
    sigma,
    error: [sigma, sigma],
    trueskill: (mu - (3 * sigma)).toFixed(3),
  })
})//.filter(d => state[d.player].matches !== 0)

const graph = data => {
  const players = getPlayers(data)
  let state = initPlays(players)
  data.map(addStats(state))
  console.table(state)

  return {
    results: calculateScore(state),
    'total': data.length,
    'sample': data.length
  };
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case STANDINGS_INIT:
      return {
        ...state,
        positions: getPositions(data),
        players: getPlayers(data),
        // ...graph(data)
      };
    default:
      return {
        players: getPlayers(data),
        positions: getPositions(data),
        data,
      };
  }
};
