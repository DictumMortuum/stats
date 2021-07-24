import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
// import { ReactComponent as ScytheLogo } from './icons/scythe.svg';
// import { ScytheImg } from './icons/scythe.jpg';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  table: {
    maxWidth: 650,
  },
}));

const generateTimelineItem = classes => boardgame => (
  <TimelineItem key={boardgame.play.id}>
    <TimelineOppositeContent>
      <Typography variant="body2" color="textSecondary">
        {new Date(boardgame.play.date).toLocaleDateString('el-GR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </Typography>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot variant="outlined" color="primary" />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" component="h1">
          {boardgame.play.boardgame}
        </Typography>
        <Typography >
          {boardgame.stats[0].player} - {boardgame.stats[0].data.score}
        </Typography>
      </Paper>
    </TimelineContent>
  </TimelineItem>
)

const Element = (props) => {
  const classes = useStyles();
  const { data } = props;
  let f = generateTimelineItem(classes)
  return (
    <Timeline align="alternate">{data.reverse().map(d => f(d))}</Timeline>
  );
}

const mapStateToProps = state => ({
  ...state.standingsReducer,
  open: state.configReducer.open
})

export default connect(mapStateToProps)(Element);
