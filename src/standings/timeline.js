import React, { useState } from 'react';
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
import { Avatar, Chip, Divider, Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { dateSort } from './common';
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
  GiEgyptianWalk,
  GiPotionBall,
  GiHorseHead,
  GiCow,
  GiPirateFlag,
  GiShipWheel,
  GiPowerLightning,
  GiItalia
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
// import { TrueSkill } from 'ts-trueskill';

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
  },
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

const getBoardgameIcon = boardgame => {
  switch(boardgame.boardgame) {
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
    case "The Quacks of Quedlinburg":
      return <GiPotionBall />
    case "Raiders of Scythia":
      return <GiHorseHead />
    case "Clans of Caledonia":
      return <GiCow />
    case "Maracaibo":
      return <GiPirateFlag />
    case "Puerto Rico":
      return <GiShipWheel />
    case "Power Grid":
      return <GiPowerLightning />
    case "De Vulgari Eloquentia":
      return <GiItalia />
    default:
      return <FaChessBoard />
  }
}

const generateStanding = (stats, winner) => (
  <Chip key={stats.id} avatar={<Avatar>{stats.data.score.toFixed(0)}</Avatar>} label={stats.player} color={winner ? "primary" : "default"} />
)

const generateCooperative = (stats) => (
  <Chip key={stats.id} label={stats.player} color={stats.data.won ? "primary" : "default"} />
)

const generateTimelineItem = classes => boardgame => (
  <TimelineItem key={boardgame.id}>
    <TimelineOppositeContent>
      <Typography variant="body2" color="textSecondary" className={classes.date}>
        {new Date(boardgame.date).toLocaleDateString('el-GR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
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
    {boardgame.boardgame_data.cooperative !== true ?
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" component="h1">
          {boardgame.boardgame}
        </Typography>
        <Divider />
        <div className={classes.chips}>
          {boardgame.stats.map((stat, i) => generateStanding(stat, i === 0))}
        </div>
        <Divider />
        <Typography variant="body2" component="p">
          Outcome probability: {boardgame.probability.toFixed(2)}%
        </Typography>
      </Paper> :
      <Paper elevation={3} className={classes.paper}>
      <Typography variant="h6" component="h1">
        {boardgame.boardgame}
      </Typography>
      <Divider />
      <div className={classes.chips}>
        {boardgame.stats.map((stat, i) => generateCooperative(stat))}
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

const getWinsNumber = data => player => {
  if (player === "") {
    return -1
  }

  let rs = data.map(d => d.stats[0].player).filter(d => d === player)
  return rs.length
}

const Element = (props) => {
  const classes = useStyles();
  const [player, setPlayer] = useState("");
  const { data, players } = props;
  let wins = getWinsNumber(data)(player)
  let f = generateTimelineItem(classes)
  let rs = data.slice().sort(dateSort).filter(d => {
    if(player === "") {
      return true
    }

    let players = d.stats.map(s => s.player).filter(s => s === player)

    return players.length > 0
  }).map(d => f(d))

  const handleChange = (event) => {
    setPlayer(event.target.value);
  };

  return (
    <Grid container className={classes.root} alignContent="center" alignItems="center" >
      <Grid item md={2} xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="player-select-label">Player</InputLabel>
          <Select
            labelId="player-select-label"
            id="player-select"
            value={player}
            onChange={handleChange}
          >
            <MenuItem key={-1} value="">None</MenuItem>
            {players.map(d => <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={10} xs={6}>
        <Chip avatar={<Avatar>{rs.length.toFixed(0)}</Avatar>} label="Games" color="primary" />
        {wins > 0 && <Chip avatar={<Avatar>{wins.toFixed(0)}</Avatar>} label="Wins" />}
      </Grid>
      <Grid item xs={false} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <Timeline align="alternate">{rs}</Timeline>
      </Grid>
      <Grid item xs={false} md={2}></Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  ...state.standingsReducer,
  open: state.configReducer.open
})

export default connect(mapStateToProps)(Element);
