import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Background from './background.svg';
import Jack from './jack.png';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
    backgroundImage: `url(${Background})`,
  },
  right: {
    textAlign: "right",
  },
  heading: {
    padding: 10,
    backgroundColor: '#4c566a',
    color: "#eceff4",
    marginBottom: 20,
  },
  headline: {
    textAlign: 'center',
  },
  color: {
    color: "#88c0d0"
  },
  imageContainer: {
    display: "block",
  },
  image: {
    [theme.breakpoints.up('xl')]: {
      height: 150,
      width: 150
    },
    height: 100,
    width: 100,
    objectFit: "scale-down",
    backgroundColor: "#fff",
    borderColor: "#5e81ac",
    borderWidth: 1,
    borderStyle: "solid",
    marginLeft: 10,
  },
  padding: {
    padding: 20,
  },
}));

const data_theoni = [
  {
    title: "Fog of Love / Codenames: Duet",
    img: [
      "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1579643118827",
      "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1559254186139-51k7gfv13lL.jpg"
    ],
    content: " Η λίστα μου περιλαμβάνει παιχνίδια όπως το fog of love και το codenames duet, για να τα παίζω μαζί με τον Δημήτρη και να γελάμε. Ειδικά το codenames, είναι ένα παιχνίδι που μου αρέσει, αλλά όταν είμαστε πολλοί, ποτέ δεν το επιλέγουμε. "
  }, {
    title: "Clank! A Deck-Building Adventure / Dominion / Fort",
    img: [
      "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1559254970101-61gHdS3ds2L.jpg",
      "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1559254200326-6135RVKbZZL.jpg",
      "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1595027240762"
    ],
    content: " Το Clank! είναι ένα από τα πρώτα παιχνίδια που έπαιξα και μάλιστα νίκησα ✌! Το Dominion δεν το έχω παίξει, αλλά ο Δημήτρης λέει ότι θα μου αρέσει. Το Fort υπάρχει στη λίστα μου επειδή μοιάζει με το Root, έχει γλυκούλικα ζωάκια και καλή βαθμολογία.",
  }, {
    title: "Paris / Museum / Pret-a-porter",
    img: [
      "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1629325406777.jpg",
      "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1545167939000",
      "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1563499700730"
    ],
    content: "Το Paris είναι μια πικρή ιστορία των περσινών Χριστουγέννων. Το είχα παραγγείλει, αλλά ποτέ δεν έγινε διαθέσιμο και αναγκάστηκα να ακυρώσω την παραγγελία. Το Museum και το Pret-a-porter είναι δύο παιχνίδια που δεν έχουν καμιά σχέση με τις θεματικές που έχουν τα παιχνίδια που ήδη έχουμε, αλλά μοιάζουν διασκεδαστικά.",
  }, {
    title: "Stone Age",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1559254167104-512BzBFksXNL.jpg"],
    content: "Το Stone Age θέλω καιρό να το πάρω, γιατί έχει κάνει ένα comeback και το βλέπω παντού, αλλά και αυτό (όπως και τα περισσότερα) είναι για 4 παίκτες και συνήθως στις παρέες, όπως λέει και ο Δημήτρης, υπάρχουν 2 ζευγάρια και ένα μπακούρι και αυτό είναι πρόβλημα 💔."
  }, {
    title: "Once Upon a Time",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1543423158155"],
    content: "Το Once Upon a Time από όσο καταλαβαίνω έχει θέμα τα παραμύθια και επειδή κάνω σεμινάρια για την αφήγηση, αλλά μου αρέσει και ο αυτοσχεδιασμός, πιστεύω ότι θα τα πηγαίνω καλά και θα φτιάχνονται καλές ιστορίες 🧙‍♂️🧚‍♀️."
  }, {
    title: "Villainous",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1563290433378"],
    content: "Το Villainous δε θέλει αιτιολόγηση! Έχει θέμα όλους τους παρεξηγημένους κακούς τους Disney!"
  }, {
    title: "Coffee Roaster",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1629322214299.jpg"],
    content: "Το Coffee Roaster είναι ένα μοναχικό παιχνίδι για ένα άτομο, αλλά μου θυμίζει την αγάπη του Δημήτρη για τον καφέ ☕ και θα ήθελα να του το κάνω δώρο, μόνο και μόνο για το θέμα του."
  }, {
    title: "Innovation",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1629324557027.jpg"],
    content: "Τέλος, το Innovation είναι ένα παιχνίδι που μας έχει δανείσει ένας φίλος και μου φαίνεται πολύ ενδιαφέρον. Ωστόσο, η έκδοση είναι διαφορετική από αυτή που φαίνεται στο BGG. Μου αρέσει γιατί είναι βασισμένο σε κάρτες και το μέγεθός του είναι βολικό."
  }
]

const data_dimitris = [
  {
    title: "Obsession",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1541021059713"],
    content: "Μου αρέσουν πολύ τα επιτραπέζια τα οποία έχουν παράξενο theme, και πιστεύω ότι αυτό είναι μοναδικό! Δηλαδή, δεν ασχολείται καθόλου με μπουντρούμια, σκωτσέζους, ιππότες, κλπ, αλλά με το πως φλέρταραν οι νέοι την βικτωριανή εποχή και έχει και ένα vibe της Jane Austen. Το γεγονός πως έχει deck building / hand management σαν το Roccoco έχει βάλει το Obsession στο top της λίστας μου!"
  }, {
    title: "A Feast for Odin",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1559254971843-51FVPlTTtoL.jpg"],
    content: "Διασκεδάζω πάρα πολύ με το να βλέπω κανάλια με επιτραπέζια στο youtube και πάει λίγος καιρός από τότε που παρακολούθησα ένα full playthrough του Feast for Odin. Ενώ τις περισσότερες φορές χάνω ενδιαφέρον και συνεχίζω να κάνω άλλα πράγματα στον υπολογιστή, εκείνο το επεισόδιο με κράτησε μέχρι το τέλος. Είναι στο ραντάρ μου πολύ καιρό, γιατί έχει αυτό το polyomino μηχανισμό, λογικό για παιχνίδι του Uwe Rosenberg, αλλά με έκανε να το ξεχωρίσω επειδή έχει τόσες πολλές διαφορετικές επιλογές στην αρχή του παιχνιδιού - με κάνει να θέλω να τις εξερευνήσω όλες :D."
  }, {
    title: "Glen More II: Chronicles",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1547933426813"],
    content: "Άλλο ένα παιχνίδι που ανακάλυψα ότι μου αρέσει βλέποντας το youtube playthrough, στο JonGetsGames, ο μηχανισμός που καθορίζει ποιος παίζει πρώτος που ταυτόχρονα σου επιτρέπει να πάρεις ένα tile το οποίο είναι αρκετά μπροστά αλλά το χρειάζεσαι, μου φάνηκε πάρα πολύ έξυπνος."
  }, {
    title: "Rurik: Dawn of Kiev",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1545152700186"],
    content: "Σαν παρέα μας αρέσει πάρα πολύ το Scythe, το οποίο όμως έχει αρχίσει να μας κουράζει, καθώς το έχουμε παίξει παραπάνω από 80-90 φορές, με διάφορα expansions. Ψάχνοντας κάποιο που θα μπορούσε να το αντικαταστήσει, αρκετός κόσμος μας είπε ότι το Rurik είναι μια επιλογή και ο μηχανισμός με τον προγραμματισμό κινήσεων ήταν αρκετά καλός για να μου κεντρίσει το ενδιαφέρον."
  }, {
    title: "Underwater Cities",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1539130403830"],
    content: "Υπάρχει στο ραντάρ μου λίγο καιρό, κυρίως γιατί μου αρέσουν τα engine building παιχνίδια. Πολλοί το παρομοιάζουν με το Terraforming Mars, το οποίο με προβληματίζει λίγο, γιατί θεωρούμε ότι αν και καλό παιχνίδι, δεν θα έπρεπε να είναι τόσο δραματικά ψηλά στην βαθμολογία του BGG."
  }, {
    title: "7 Wonders Duel: Agora",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1597014235617"],
    content: "Το 7 Wonders Duel είναι πολύ σημαντικό για εμένα και τη Θεώνη, διότι είναι το παιχνίδι με το οποίο ξεκινήσαμε να εξερευνούμε τα επιτραπέζια. Έχουμε ήδη το πρώτο expansion το οποίο είναι εξαιρετικό και θέλουμε πολύ καιρό να πάρουμε και το δεύτερο. Στόχος μας είναι να ολοκληρώσουμε όλες τις σελίδες που έχουν τα scorepads του παιχνιδιού :)."
  }, {
    title: "Ethnos",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1559254188773-61u2CWRFSlL.jpg"],
    content: "Αν και ομολογουμένως τα components του παιχνιδού αυτού είναι πολύ μεχ - και αυτό το λέω εγώ, που το theme δε με ενδιαφέρει σχεδόν καθόλου (εκτός από τις περιπτώσεις που πραγματικά κάνει την έκπληξη, όπως για παράδειγμα στο Obsession!), σε σχέση με τα mechanics, το Ethnos μου έκανε εντύπωση γιατί κατάφερε να κάνει ενδιαφέρον ένα mechanic το οποίο δεν το έχω σε μεγάλη εκτίμηση, το set collection."
  }, {
    title: "Inis",
    img: ["https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1608452604536"],
    content: "Άλλο ένα παιχνίδι που μας έχει προταθεί για αντικαταστάτης των παιχνιδιών που αρέσουν περισσότερο στην παρέα, όπως το Kemet, το Scythe, το Cyclades και το Blood Rage."
  }
]

const Santa2021 = props => {
  const classes = useStyles();

  const dimitris = data_dimitris.map(d => ({...d, owner: "Δημήτρης"}));
  const theoni = data_theoni.map(d => ({...d, owner: "Θεώνη"}));
  let data = [];

  for (let i = 0; i < dimitris.length; i++) {
    data.push(theoni[i])
    data.push(dimitris[i])
  }

  return (
    <Grid container className={classes.root} alignContent="center" alignItems="center" >
      <Grid container>
        <Grid className={classes.heading} item xs={1}>
          <img style={{ height: 30 }} alt="" src={Jack} />
        </Grid>
        <Grid className={classes.heading} style={{ textAlign: "right" }} item xs={5}>
          <Typography variant="h5">Secret Santa <span className={classes.color}>2021</span></Typography>
        </Grid>
        <Grid className={classes.heading} item xs={6}>
          <Typography variant="h5">Αποστολή 1</Typography>
        </Grid>
      </Grid>

      <Grid item xs={0} md={1}></Grid>
      <Grid item xs={12} md={5} style={{ padding: 10 }} className={classes.right}>
        <Paper style={{ padding: 20 }} elevation={4} square>
          <Typography variant="body2" component="p" gutterBottom>
            Αγαπητέ Άγιε Βασίλη <span role="img" aria-label="santa">🎅</span>,
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Ελπίζω να είσαι καλά. Σου γράφω σε απόκριση της πρώτης μας αναγνωριστικής αποστολής. Από τον άλλο μήνα που θα είμαι μια άνεργη καλλιτέχνις και χαραμοφάισσα, θα έχω πολύ χρόνο για να αφιερωθώ στις αποστολές σου. Ελπίζω και ο σύζυξ να μπορεί να ακολουθήσει για να σε κάνουμε πολύ υπερήφανο!
          </Typography>
          <Typography variant="body2" component="p">
            Με εκτίμηση,
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Θεώνη
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={5} style={{ padding: 10 }}>
        <Paper style={{ padding: 20 }} elevation={4} square>
          <Typography variant="body2" component="p" gutterBottom>
            Αγαπητέ Άγιε Βασίλη <span role="img" aria-label="santa">🎅</span>,
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Φέτος αποφάσισα ότι θα εκτελέσω όλες σου τις αποστολές με μεγάλη αφοσίωση και για αυτό αποφάσισα να χρησιμοποιήσω τα ταλέντα μου για να φτιάξω το παρόν. Σάντα μου είμαι έτοιμος για τα πάντα, δε θα κολλήσω πουθενά! Ελπίζω να έχουμε καλά χριστούγεννα, με πολλά παιχνίδια, όπως ήταν το 2021.
          </Typography>
          <Typography variant="body2" component="p">
            Με εκτίμηση,
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Δημήτρης
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={0} md={1}></Grid>


      <Grid item xs={1} md={2}></Grid>
      <Grid item xs={10} md={8}>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          Λίγα λόγια για εμάς
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Είμαστε η Θεώνη και ο Δημήτρης και έχουμε πολύ ενεργή ζωή όσον αφορά τα επιτραπέζια. Εγώ πάντα ασχολιόμουν με το hobby, αλλά τους περισσότερους τίτλους τους είχε άλλος στην παρέα, στο σπίτι του οποίου πηγαίναμε συνέχεια. Με την καραντίνα όμως όλα αυτά άλλαξαν και μετά τον γάμο μας τον Μάρτιο, η Θεώνη, ξέροντας ότι μου αρέσουν τα παιχνίδια άρχισε να μου κάνει πολλά δώρα, σε άσχετες χρονικά στιγμές κιόλας (δεν ήταν μόνο όταν είχα γιορτή ή γενέθλια δηλαδή). Με αυτόν τον τρόπο η συλλογή μας μεγάλωσε σημαντικά τα τελευταία 1-2 χρόνια.
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Παίζουμε πολύ συχνά τόσο με φίλους όσο και μόνοι μας. Για την ακρίβεια σάντα μου είμαι τρελός με τα στατιστικά και κρατάω logs με όλα τα παιχνίδια που έχουμε παίξει, τα οποία τα μοιράζομαι με τους συμπαίχτες μου και μπορείς να τα βρεις <Link to="/standings">εδώ</Link>. Τα στατιστικά χρησιμοποιούν τον αλγόριθμο trueskill της microsoft που είναι στην ουσία κάτι σαν το ELO (αυτό που χρησιμοποιούν στο σκάκι), αλλά για multiplayer παιχνίδια. Επίσης, επειδή μέσα στο 2021 παίξαμε τόσο πολύ, αποφάσισα να φτιάξω μια σελίδα για τον απολογισμό του έτους, την οποία μπορείς να επισκεφτείς <Link to="/2021">εδώ</Link>, όπου έχει γραφήματα για τον αριθμό των ατόμων με τα οποία παίζουμε συνήθως, ποια παιχνίδια έχουμε παίξει περισσότερο, αλλά και άλλα, τα οποία μπορεί να σε ενδιαφέρουν.
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Τέλος να σου πω ότι δεν έχουμε κάποιο στέκι, όχι, αλλά σκεφτόμασταν να αρχίσουμε να πηγαίνουμε κάπου. Δυστυχώς η πανδημία δεν βοηθάει ιδιαίτερα, αλλά η Θεώνη το παρακολουθεί - έχει κάνει join σε μερικά groups στο facebook και ποστάρει συχνά φωτογραφίες με τις επιτραπέζιές μας περιπέτειες.
        </Typography>
      </Grid>
      <Grid item xs={1} md={2}></Grid>

      <Grid item xs={0} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <Timeline align="alternate">
          {
            data.map((item, i) => (
              <CustomTimelineItem
                id={i}
                owner={item.owner}
                title={item.title}
                img={item.img}
                content={item.content}
              />
            ))
          }
        </Timeline>
      </Grid>
      <Grid item xs={0} md={2}></Grid>
    </Grid>
  )
}

export default Santa2021;

const CustomTimelineItem = props => {
  const classes = useStyles();

  return (
    <TimelineItem key={props.id} style={{ marginBottom: 20 }}>
      <TimelineOppositeContent>
        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
          {props.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2" color="primary">
          {props.owner}
        </Typography>
        <Typography variant="body2" component="p" color="textPrimary">
          {props.content}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="secondary"></TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <span class={classes.imageContainer}>
          {props.img.map(i => <img class={classes.image} alt="" src={i} />)}
        </span>
      </TimelineContent>
    </TimelineItem>
  )
}
