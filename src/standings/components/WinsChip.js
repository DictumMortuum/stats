import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Chip } from '@material-ui/core';

export default () => {
  const { player_games, player } = useSelector(state => state.standingsReducer);

  let wins = 0;
  if(player !== "") {
    console.log(player_games)
    wins = player_games.map(d => d.stats[0].player).filter(d => d === player).length
    return <Chip avatar={<Avatar>{wins.toFixed(0)}</Avatar>} label="Wins" />
  } else {
    return <span></span>
  }
}
