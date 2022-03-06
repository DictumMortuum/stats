import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
// import IconButton from '@material-ui/core/IconButton';
// import ShareIcon from '@material-ui/icons/Share';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card_header: {
    minHeight: 110,
  },
  cover: {
    paddingTop: '75%', // 16:9
  },
}));

export default props => {
  const classes = useStyles();

  return (
    <Card key={props.id}>
      <Link to={"/prices/item/" + props.boardgame_id}>
        <CardMedia className={classes.cover} image={props.thumb} />
      </Link>
      <CardContent className={classes.card_header}>
        <Typography variant="subtitle1" color="textSecondary">
          BGG Rank {props.rank}
        </Typography>
        <Typography variant="subtitle1">
          {props.boardgame_name}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Link to={"/prices/item/" + props.boardgame_id}>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Link>
      </CardActions> */}
    </Card>
  )
}
