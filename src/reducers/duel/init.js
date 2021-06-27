import data from '../../duel/plays.json';
import {result, tally} from './score';
import {
  unique,
  flatten,
  collection
} from '../../common';

const addScoreToData = game => {
  const {player1, player2} = game;
  const total1 = tally(player1);
  const total2 = tally(player2);
  const winner = result(game);

  return {
    ...game,
    winner,
    player1: {
      ...player1,
      won: player1.player === winner,
      total: total1
    },
    player2: {
      ...player2,
      won: player2.player === winner,
      total: total2
    }
  }
};

export default {
  players: unique(flatten(collection(data)(d => [d.player2.player, d.player1.player]))),
  games: data.map(addScoreToData),
  colors: ['blue', 'green', 'yellow', 'purple', 'wonder', 'marker', 'coin', 'battle', 'temple', 'pantheon']
};
