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
import { IconContext } from "react-icons";
import { Avatar, Chip, Divider } from '@material-ui/core';
import {
  GiSwapBag,
  GiLibertyWing,
  GiAncientRuins,
  GiScythe,
  GiVikingHelmet,
  GiCastle,
  GiJuggler,
  GiBlood,
  GiPlantsAndAnimals,
  GiTreeRoots,
  GiDuel,
  GiAzulFlake,
  GiVampireDracula,
  GiRolledCloth,
  GiElvenCastle,
  GiRiver,
  GiChessRook,
  GiEgyptianWalk
} from 'react-icons/gi';
import {
  FaChessBoard,
  FaVenus,
  FaWineGlass,
  FaHatCowboy,
  FaChessKing,
  FaChessKnight,
  FaChessBishop,
} from 'react-icons/fa';
import { WiTrain } from 'react-icons/wi';

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
  chips: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  date: {
    margin: theme.spacing(1.5, 0, 1.5, 0),
  }
}));

const getBoardgameIcon = boardgame => {
  switch(boardgame.play.boardgame) {
    case "Great Western Trail":
      return <FaHatCowboy />
    case "Azul":
      return <GiAzulFlake />
    case "7 Wonders Duel":
      return <GiDuel />
    case "Hero Realms":
      return <GiVampireDracula />
    case "Root":
      return <GiTreeRoots />
    case "Ticket to ride: Europe":
      return <WiTrain />
    case "Architects of the west kingdom":
      return <FaChessBishop />
    case "Paladins of the West Kingdom":
      return <FaChessKnight />
    case "Viscounts of the West Kingdom":
      return <FaChessKing />
    case "Everdell":
      return <GiPlantsAndAnimals />
    case "Viticulture essential edition":
      return <FaWineGlass />
    case "Blood rage":
      return <GiBlood />
    case "Orléans":
      return <GiSwapBag />
    case "Wingspan":
      return <GiLibertyWing />
    case "Lost ruins of Arnak":
      return <GiAncientRuins />
    case "Scythe":
      return <GiScythe />
    case "Raiders of the north sea":
      return <GiVikingHelmet />
    case "Castles of Burgundy":
      return <GiCastle />
    case "Concordia Venus":
      return <FaVenus />
    case "The Magnificent":
      return <GiJuggler />
    case "Lords of Waterdeep":
      return <GiChessRook />
    case "Patchwork":
      return <GiRolledCloth />
    case "Carcassonne":
      return <GiElvenCastle />
    case "Tigris & Euphrates":
      return <GiRiver />
    case "Kemet":
      return <GiEgyptianWalk />
    default:
      return <FaChessBoard />
  }
}

const generateStanding = (stats, winner) => (
  <Chip key={stats.id} avatar={<Avatar>{stats.data.score}</Avatar>} label={stats.player} color={winner ? "primary" : "default"} />
)

const generateTimelineItem = classes => boardgame => (
  <TimelineItem key={boardgame.play.id}>
    <TimelineOppositeContent>
      <Typography variant="body2" color="textSecondary" className={classes.date}>
        {new Date(boardgame.play.date).toLocaleDateString('el-GR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </Typography>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot color="primary">
        <IconContext.Provider value={{ size: "2em" }}>
          {getBoardgameIcon(boardgame)}
        </IconContext.Provider>
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" component="h1">
          {boardgame.play.boardgame}
        </Typography>
        <Divider />
        <div className={classes.chips}>
          {boardgame.stats.map((stat, i) => generateStanding(stat, i === 0))}
        </div>
      </Paper>
    </TimelineContent>
  </TimelineItem>
)

const dateSort = (a, b) => {
  let diff = new Date(b.play.date) - new Date(a.play.date)
  if (diff === 0) {
    return b.play.id - a.play.id
  } else {
    return diff
  }
}

const Element = (props) => {
  const classes = useStyles();
  const { data } = props;
  let f = generateTimelineItem(classes)
  return (
    <Timeline align="alternate">{data.sort(dateSort).map(d => f(d))}</Timeline>
  );
}

const mapStateToProps = state => ({
  ...state.standingsReducer,
  open: state.configReducer.open
})

export default connect(mapStateToProps)(Element);
