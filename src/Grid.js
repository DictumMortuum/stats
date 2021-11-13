import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    alignSelf: 'center',
    left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  gridList: {
    width: '100%'
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const getGridListCols = width => {
  if (isWidthUp('xl', width)) {
    return 2;
  }

  if (isWidthUp('lg', width)) {
    return 2;
  }

  if (isWidthUp('md', width)) {
    return 1;
  }

  return 0;
}

const ImagesList = props => (
  <GridList cellHeight={300} spacing={30} cols={props.width}>
    {props.tiles.map((tile) => (
      <GridListTile key={tile.img}>
        <Link to={tile.link}>
          <img src={tile.img} alt={tile.title} className={"MuiGridListTile-imgFullHeight"} />
        </Link>
      </GridListTile>
    ))}
  </GridList>
)

const ButtonsList = props => (
  <ButtonGroup size="large" color="primary" orientation="vertical" aria-label="vertical contained button group" variant="text">
    {props.tiles.map((tile) => (
      <Link to={tile.link}>
        <Button key={tile.img}>{tile.title}</Button>
      </Link>
    ))}
  </ButtonGroup>
)

const TitlebarGridList = props => {
  const classes = useStyles();
  const { width, tiles } = props;
  const size = getGridListCols(width)
  let list;

  if (size > 0) {
    list = <ImagesList tiles={tiles} />
  } else {
    list = <ButtonsList tiles={tiles} />
  }

  return (
    <div className={classes.root}>
      {list}
    </div>
  )
}

export default withWidth()(TitlebarGridList)
