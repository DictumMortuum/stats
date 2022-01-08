import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 350
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { store_thumb, url, thumb, boardgame_name, name, store_name, price } = props.boardgame;

  return (
    <Card className={classes.root}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <CardMedia
          className={classes.media}
          image={store_thumb === "" ? thumb : store_thumb}
        />
      </a>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {boardgame_name[0]}
          </Avatar>
        }
        action={
          <div>
            <IconButton href={url}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={() => dispatch({
              type: "ADD_TO_CART",
              cart: props.boardgame,
            })}>
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        }
        title={name}
        subheader={store_name + " - € " + price}
      />
    </Card>
  )
}
