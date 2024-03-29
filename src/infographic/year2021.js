import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BarChart from './components/bar';
import PieChart from './components/pie';
import { connect } from 'react-redux';
import { playsPerPlayer, playsPerMonth, playsPerDay, playsPerGame, playersPerPlay, year, up_to_year, sortTag, sortTagDesc, sortPlayers } from './common';
import { graph } from '../standings/standings';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
  },
  heading: {
    backgroundColor: '#4c566a',
    color: "#eceff4",
  },
  headline: {
    padding: '2%',
    textAlign: 'center',
  },
  color: {
    color: "#88c0d0"
  },
}));

const mapStateToProps = (state, props) => ({
  ...state.standingsReducer,
})

const infographic = props => {
  const { data } = props;
  const current_year = 2021;
  const previous_year = current_year - 1;
  const next_year = current_year + 1;
  const classes = useStyles();
  const up_to_current_year = up_to_year(data)(current_year)
  const games_previous_year = year(data)(previous_year)
  const games = year(data)(current_year)
  const perPlayer = playsPerPlayer(games)
  const perMonth = playsPerMonth(games)
  const perDay = playsPerDay(games)
  const perGame = playsPerGame(games)
  const playerCountPerGame = playersPerPlay(games)
  const stats = graph({...props, data: up_to_current_year})
  const topScores = games.map(d => ({
    player: d.stats[0].player,
    boardgame: d.boardgame,
    score: d.stats[0].data.score,
  }))

  return (
    <Grid container className={classes.root} spacing={5} alignContent="center" alignItems="center" style={{ padding: 20 }}>
      <AppBar position="static" style={{ marginBottom: 20 }}>
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1}}>Απολογισμός επιτραπεζίων παιχνιδιών <span className={classes.color}>{current_year}</span></Typography>
        </Toolbar>
      </AppBar>

      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="body1">Mέσα στο {current_year} <b>παίξαμε συνολικά {games.length} παιχνίδια</b>, τα οποία είναι πολύ περισσότερα από αυτά που παίξαμε στο 2020, που στον αριθμό ήταν {games_previous_year.length}.</Typography>
      </Grid>
      <Grid item xs={2} />


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Παιχνίδια ανά μήνα</Typography>
        <Typography variant="body1">Εδώ παρουσιάζονται τα παιχνίδια που έχουμε παίξει σαν γκρουπ στα αριστερά και τα παιχνίδια που έχουμε παίξει με τη Θεώνη μόνοι μας. Πριν τον Μάρτιο δυστυχώς δεν κρατούσα στατιστικά για όλα τα παιχνίδια και για αυτό δεν εμφανίζονται στο διάγραμμα, αλλά έχω την εντύπωση ότι δεν παίζαμε και πάρα πολλά λόγω της καραντίνας.</Typography>
        <Typography variant="body1">Φαίνεται ότι τα περισσότερα παιχνίδια έχουν παιχτεί πριν το καλοκαίρι, από τον Απρίλιο μέχρι τον Ιούλιο.</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perMonth} dataKeys={[{dataKey: "παιχνίδια", color: "#d08770", stack: "a"}, {dataKey: "ζευγάρι", color: "#5e81ac", stack: "a"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Παιχνίδια ανά ημέρα της βδομάδας</Typography>
        <Typography variant="body1">Προφανώς παίζουμε την πλειοψηφία των παιχνιδιών το Σαββατοκύριακο. Μου κάνει εντύπωση όμως πως οι Παρασκευές έχουν περίπου όσα και οι Πέμπτες!</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perDay} dataKeys={[{dataKey: "παιχνίδια", color: "#bf616a", stack: "a"}, {dataKey: "ζευγάρι", color: "#81a1c1", stack: "a"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Παιχνίδια ανά παίχτη</Typography>
        <Typography variant="body1">Μέσα στο 2021 <b>παίξαμε συνολικά με {perPlayer.length} διαφορετικά άτομα</b>! Στο παρακάτω γράφημα εμφανίζονται ο αριθμός των παιχνιδιών στα οποία έχει συμμετάσχει ο κάθε παίχτης.</Typography>
        <Typography variant="body1">Για να είναι πιο όμορφη η παρουσίαση του γραφήματος, έχω αποκρύψει όλους τους παίχτες οι οποίοι έχουν αριθμό συμμετοχών λιγότερες των τριών.</Typography>
        <Typography variant="body1">Επίσης, εξαιρώ τα παιχνίδια στα οποία έχω παίξει μόνο με τη Θεώνη, αφενώς γιατί έχουμε πάρα πολλά συγκριτικά, όπως φαίνεται στο προηγούμενο γράφημα.</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perPlayer.filter(d => d.plays > 3)} dataKeys={[{dataKey: "plays", color: "#4c566a"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Αριθμός διαφορετικών παιχνιδιών</Typography>
        <Typography variant="body1">Κατά τη διάρκεια του έτους <b>είχαμε την ευκαιρία να παίξουμε {perGame.length} διαφορετικά παιχνίδια</b>. Για αυτό ευθύνεται κυρίως η Θεώνη, η οποία μου έκανε δώρο τα περισσότερα. Παρακάτω παραθέτω το top 5 των παιχνιδιών που έβγαλαν τα λεφτά τους και τα παίξαμε παραπάνω από τα υπόλοιπα.</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perGame.slice(0, 5)} dataKeys={[{dataKey: "plays", color: "#a3be8c"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Αριθμός παιχτών ανά παιχνίδι</Typography>
        <Typography variant="body1">Εδώ φαίνονται ο αριθμός των παιχτών που έχουμε παίξει ανά παιχνίδι. Περίμενα πως τα περισσότερα παιχνίδια θα ήταν ανάμεσα σε εμένα και στη Θεώνη, αλλά το γεγονός ότι <b>έχουμε {playerCountPerGame[1].size + playerCountPerGame[2].size} παιχνίδια με 3 ή 4 παίχτες</b> (σχεδόν τα μισά!) είναι εντυπωσιακό.</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <PieChart data={playerCountPerGame} dataKeys={[{dataKey: "size", color: ["#bf616a","#d08770", "#b48ead", "#4c566a", "#81a1c1"]}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Δημοφιλή παιχνίδια</Typography>
        <Typography variant="body1">Στο παρακάτω γράφημα φαίνονται τα παιχνίδια τα οποία είναι τα πιο δημοφιλή, τα οποία δηλαδή έχουν παιχτεί από τους περισσότερους ανθρώπους.</Typography>
        <Typography variant="body1">Ενδιαφέρον είναι το γεγονός πως πρώτο είναι το Quacks, το hit του φθινοπώρου, το οποίο όμως παίζεται μόνο από 4 παίχτες. Τώρα που έχουμε και το expansion θα γίνει χαμός. Το ίδιο συμβαίνει και με το Arnak, το οποίο βρίσκεται δεύτερο, παρά το γεγονός πως παίζεται μόνο από 4 παίχτες. Επίσης ενδιαφέρον είναι πως στη λίστα βρίσκεται το Orleans, άλλο ένα bag building παιχνίδι. Τέλος το Waterdeep, το Viticulture, to Architects και το Concordia μπορούν να παιχτούν από 6-7 άτομα, επομένως δεν είναι πολύ παράξενο που βρίσκονται σε αυτή τη λίστα.</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={perGame.sort(sortPlayers).filter(d => d.players > 6)} dataKeys={[{dataKey: "players", color: "#b48ead"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Περισσότεροι πόντοι</Typography>
        <Typography variant="body1">Εδώ παρουσιάζονται τα παιχνίδια στα οποία έχουμε σκοράρει τους περισσότερους πόντους!</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart layout="vertical" data={topScores.sort(sortTagDesc("score")).slice(0, 11)} name="boardgame" dataKeys={[{dataKey: "score", color: "#a3be8c"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom={true}>Πίστη του συστήματος στην απόδοση των παιχτών</Typography>
        <Typography variant="body1">Το οποίο σημαίνει ότι όσο πιο μικρό είναι αυτό το σύνολο, τόσο πιο ακριβές είναι το συνολικό σας score. Συνήθως η πίστη του συστήματος βελτιώνεται όταν κάποιος παίζει πολλά παιχνίδια, και αυτό φαίνεται στα στοιχεία του παρακάτω γραφήματος.</Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <BarChart data={stats.results.sort(sortTag("sigma")).filter(d => d.sigma < 1.200)} name="player" dataKeys={[{dataKey: "sigma", color: "#5e81ac"}]} />
      </Grid>


      <Grid item xs={2} />
      <Grid item xs={8}>
      <Typography variant="h4" gutterBottom={true}>Ευχαριστούμε για τα παιχνίδια! Τα λέμε το {next_year}!</Typography>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  )
}

export default connect(mapStateToProps)(infographic);
