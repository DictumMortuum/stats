import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from "react-router-dom";
import { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '75%', // 16:9
  },
  card_header: {
    minHeight: 110,
  },
}));

const Media = props => {
  const { store_thumb, url, thumb, boardgame_id } = props.boardgame;
  const { self_ref } = props;
  const classes = useStyles();

  if(self_ref) {
    return (
      <Link to={"/prices/item/" + boardgame_id}>
        <CardMedia
          className={classes.media}
          image={store_thumb === "" ? thumb : store_thumb}
        />
      </Link>
    )
  } else {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <CardMedia
          className={classes.media}
          image={store_thumb === "" ? thumb : store_thumb}
        />
      </a>
    )
  }
}

export default props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url, name, store_name, price } = props.boardgame;

  return (
    <Card>
      <Media {...props} />
      <CardContent className={classes.card_header}>
        <Typography variant="subtitle1" color="textSecondary">
          {store_name}
        </Typography>
        <Typography variant="subtitle1">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton href={url}>
          <ShareIcon />
        </IconButton>
        <IconButton onClick={() => dispatch({
          type: "ADD_TO_CART",
          cart: props.boardgame,
        })}>
          <AddShoppingCartIcon />
        </IconButton>
        <div style={{ marginLeft: 'auto', marginRight: 10}}>
          {"€ " + price}
        </div>
      </CardActions>
    </Card>
  )
}
