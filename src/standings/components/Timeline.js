import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import { useSelector } from 'react-redux';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { IconContext } from "react-icons";
import { Chip, Divider } from '@material-ui/core';
import DeltaTable from './DeltaTable';
import BoardgameIcon from './BoardgameIcon';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  table: {
    maxWidth: 650,
  },
  chips: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  date: {
    margin: theme.spacing(1.5, 0, 1.5, 0),
  },
}));

export default () => {
  const { player_games } = useSelector(state => state.standingsReducer)

  return (
    <Timeline align="alternate">
      {player_games.map(d => <BoardgameTimelineItem key={d.id} boardgame={d} />)}
    </Timeline>
  )
}

const Cooperative = props => (
  <Chip key={props.id} label={props.player} color={props.data.won ? "primary": "default"} />
)

const BoardgameTimelineItem = props => {
  const { boardgame } = props;
  const classes = useStyles();

  return (
    <TimelineItem key={boardgame.id}>
      <TimelineOppositeContent>
        <Typography variant="body2" color="textSecondary" className={classes.date}>
          {new Date(boardgame.date).toLocaleDateString('el-GR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary">
          <IconContext.Provider value={{ size: "2em" }}>
            <BoardgameIcon boardgame={boardgame.boardgame} />
          </IconContext.Provider>
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
      {boardgame.boardgame_data.cooperative !== true ?
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">
            {boardgame.boardgame}
          </Typography>
          <Divider />
          <Typography variant="body2" component="p">
            Outcome probability: {boardgame.probability.toFixed(2)}%
          </Typography>
          <Divider />
          <DeltaTable stats={boardgame.stats} />
        </Paper> :
        <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" component="h1">
          {boardgame.boardgame}
        </Typography>
        <Divider />
        <div className={classes.chips}>
          {boardgame.stats.map((stat, i) => <Cooperative key={i} {...stat} />)}
        </div>
        <Divider />
        <Typography variant="body2" component="p">
          Cooperative game
        </Typography>
      </Paper>
      }
      </TimelineContent>
    </TimelineItem>
  )
}
