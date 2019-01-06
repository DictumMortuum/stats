import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ScytheLinks, ScytheContent, ScytheImg } from './scythe/Charts';
import { KemetLinks, KemetContent, KemetImg } from './kemet/Charts';

const Scythe = () => <Game basename="stats/scythe" links={<ScytheLinks />} content={<ScytheContent />} />;
const Kemet = () => <Game basename="stats/kemet" links={<KemetLinks />} content={<KemetContent />} />;

const style = {
  width: '100%',
  height: 'auto'
}

const Index = () => (
  <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    >
    <Grid item xs={6}>
        <Link to="/stats/scythe">
          <img src={ScytheImg} alt="scythe" style={style} />
        </Link>
    </Grid>
    <Grid item xs={6}>
        <Link to="/stats/kemet">
          <img src={KemetImg} alt="kemet" style={style} />
        </Link>
    </Grid>
  </Grid>
);

ReactDOM.render(
  <Router>
    <div>
      <Route path="/stats/" exact component={Index} />
      <Route path="/stats/scythe" component={Scythe} />
      <Route path="/stats/kemet" component={Kemet} />
    </div>
  </Router>
, document.getElementById('root'));
