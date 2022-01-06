import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card_root: {
    display: 'flex',
  },
  card_details: {
    display: 'flex',
    flexDirection: 'column',
  },
  card_content: {
    flex: '2 0 auto',
  },
  cover: {
    width: 150,
  },
}));

export default props => {
  const classes = useStyles();

  return (
    <Card key={props.id} className={classes.card_root}>
      <CardMedia
        className={classes.cover}
        image={props.thumb}
      />
      <div className={classes.card_details}>
        <CardContent className={classes.card_content}>
          <Typography component="h5" variant="h5">
            {props.boardgame_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            BGG Rank {props.rank}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={"/prices/" + props.boardgame_id}>
            <Button size="small">Prices</Button>
          </Link>
          <Button size="small" href={"https://boardgamegeek.com/boardgame/" + props.boardgame_id}>BGG Link</Button>
        </CardActions>
      </div>
    </Card>
  )
}
