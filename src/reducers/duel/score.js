const tally = ({
  blue,
  green,
  yellow,
  purple,
  wonder,
  marker,
  coin,
  battle,
  temple = 0,
  pantheon = 0
}) => blue + green + yellow + purple + wonder + marker + coin + battle + temple + pantheon;

const result = ({
  player1: {
    battle_victory: bv1,
    science_victory: sv1,
    ...rest1
  },
  player2: {
    battle_victory: bv2,
    science_victory: sv2,
    ...rest2
  }
}) => {
  let score1 = tally(rest1);
  let score2 = tally(rest2);

  if (bv1 || sv1) {
    return rest1.player;
  }

  if (bv2 || sv2) {
    return rest2.player;
  }

  if (score1 === score2) {
    return "tie";
  } else if (score1 > score2) {
    return rest1.player;
  } else {
    return rest2.player;
  }
}

export {
  result,
  tally
};
