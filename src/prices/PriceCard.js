import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import classNames from 'classnames';
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '75%', // 16:9
  },
  card_header: {
    minHeight: 110,
  },
  out_of_stock: {
    opacity: 0.5,
  }
}));

const addUTM = url => {
  let rs;
  if(url[url.length-1] === "/") {
    rs = url.slice(0, -1)
  } else {
    rs = url
  }

  rs += "?utm_source=dictummortuum"
  rs += "&utm_medium=dictummortuum"
  rs += "&utm_campaign=dictummortuum"
  return rs
}

const Media = props => {
  const { store_thumb, url, thumb, boardgame_id, stock } = props.boardgame;
  const { self_ref } = props;
  const classes = useStyles();

  if(self_ref) {
    return (
      <Link to={"/prices/item/" + boardgame_id + "?stock=" + stock}>
        <CardMedia
          className={classes.media}
          image={store_thumb === "" ? thumb : store_thumb}
        />
      </Link>
    )
  } else {
    return (
      <a href={addUTM(url)} target="_blank" rel="noopener noreferrer">
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
  const { stores } = useSelector(state => state.pricesReducer);
  const { url, name, store_id, price, stock } = props.boardgame;
  const self = window.location.href;

  return (
    <Card className={classNames({[classes.out_of_stock]: stock === 2})}>
      { url && <Media {...props} />}
      <CardActions>
        <IconButton component="div">
          <FacebookShareButton style={{ height: 24 }} url={self}>
            <FacebookIcon size={24} round />
          </FacebookShareButton>
        </IconButton>

        <IconButton component="div">
          <FacebookMessengerShareButton style={{ height: 24 }} url={self}>
            <FacebookMessengerIcon size={24} round />
          </FacebookMessengerShareButton>
        </IconButton>

        <IconButton component="div">
          <ViberShareButton style={{ height: 24 }} url={self}>
            <ViberIcon size={24} round />
          </ViberShareButton>
        </IconButton>

        <IconButton component="div">
          <WhatsappShareButton style={{ height: 24 }} url={self}>
            <WhatsappIcon size={24} round />
          </WhatsappShareButton>
        </IconButton>

        <IconButton component="div">
          <TwitterShareButton style={{ height: 24 }} url={self}>
            <TwitterIcon size={24} round />
          </TwitterShareButton>
        </IconButton>
      </CardActions>
      <CardContent className={classes.card_header}>
        <Typography variant="subtitle1" color="textSecondary">
          {stores.filter(d => d.id === store_id).map(d => d.name)}
        </Typography>
        <Typography variant="subtitle1">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
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
