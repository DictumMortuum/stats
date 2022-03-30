import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BoardgameImage from './BoardgameImage';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card_header: {
    minHeight: 120,
  },
}));

export default props => {
  const classes = useStyles();
  const { id, boardgame_id, thumb, store_thumb, boardgame_name, rank, items } = props;
  const available_prices = items.sort((a, b) => a.price > b.price)
  const l = available_prices.length;

  let lowest = undefined;
  let highest = undefined;

  if (l >= 1) {
    lowest = available_prices[0]
  }

  if (l >= 2) {
    if (lowest.price !== available_prices[l-1].price) {
      highest = available_prices[l-1]
    }
  }

  return (
    <Card key={id}>
      <Link to={"/prices/item/" + boardgame_id}>
        <BoardgameImage srcs={[thumb, store_thumb]} />
      </Link>
      <CardContent className={classes.card_header}>
        <Typography variant="subtitle1" color="textSecondary">
          BGG Rank {rank}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {lowest && "€" + lowest.price} {highest && "- €" + highest.price}
        </Typography>
        <Typography variant="subtitle1">
          {boardgame_name}
        </Typography>
      </CardContent>
    </Card>
  )
}
