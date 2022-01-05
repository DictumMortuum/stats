import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const BoardgameCard = props => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <CardMedia
          className={classes.media}
          image={props.store_thumb === "" ? props.thumb : props.store_thumb}
        />
      </a>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {props.boardgame_name[0]}
          </Avatar>
        }
        action={
          <IconButton href={props.url}>
            <ShareIcon />
          </IconButton>
        }
        title={props.name}
        subheader={props.store_name + " - € " + props.price}
      />
    </Card>
  )
}

export default BoardgameCard;
