const f = order => (
  {player: player1, total: total1, battle: battle1},
  {player: player2, total: total2, battle: battle2}
) => {
  if (total1 > total2) {
    return -1;
  } else if (total1 < total2) {
    return 1;
  } else {
    if (battle1 > battle2) {
      return -1;
    } else if (battle1 < battle2) {
      return 1;
    } else {
      let a = order.indexOf(player1);
      let b = order.indexOf(player2);

      if (a > b) {
        return 1;
      }

      if (a < b) {
        return -1;
      }
    }
  }
}

const transform = ({player, vp}) => {
  let total = 0;
  let battle = 0;

  for (let type in vp) {
    total += vp[type];

    if (type === 'battle') {
      battle += vp[type]
    }
  }

  return {
    player,
    total,
    battle
  }
}

export default (order, setup) => setup.map(transform).sort(f(order));
