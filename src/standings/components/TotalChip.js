import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Chip } from '@material-ui/core';

export default () => {
  const { player, player_games, data } = useSelector(state => state.standingsReducer)

  let total;
  if (player === "") {
    total = data.length
  } else {
    total = player_games.length
  }

  return <Chip avatar={<Avatar>{total}</Avatar>} label="Games" color="primary" />
}
