import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ScytheLinks, ScytheContent, ScytheImg } from './scythe/Charts';
import { KemetLinks, KemetContent, KemetImg } from './kemet';
import { DuelLinks, DuelContent, DuelImg } from './duel';
import { StandingsLinks, StandingsContent, StandingsImg } from './standings';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer as kemetReducer } from './reducers/kemet';
import { reducer as duelReducer } from './reducers/duel';
import { reducer as standingsReducer } from './reducers/standings';
import { reducer as configReducer } from './reducers/config';

const store = createStore(combineReducers({
  kemetReducer,
  duelReducer,
  standingsReducer,
  configReducer,
}));

store.dispatch({
  type: "INIT"
});

const Scythe = () => <Game basename="stats/scythe" links={ScytheLinks} content={ScytheContent} />;
const Kemet = () => <Game basename="stats/kemet" links={KemetLinks} content={KemetContent} />;
const Duel = () => <Game basename="stats/duel" links={DuelLinks} content={DuelContent} />;
const Standings = () => <Game basename="stats/standings" links={StandingsLinks} content={StandingsContent} open={false} />;

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
    <Grid item xs={6}>
      <Link to="/stats/duel">
        <img src={DuelImg} alt="duel" style={style} />
      </Link>
    </Grid>
    <Grid item xs={6}>
      <Link to="/stats/standings">
        <img src={StandingsImg} alt="duel" style={style} />
      </Link>
    </Grid>
  </Grid>
);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path="/stats/" exact component={Index} />
      <Route path="/stats/scythe" component={Scythe} />
      <Route path="/stats/kemet" component={Kemet} />
      <Route path="/stats/duel" component={Duel} />
      <Route path="/stats/standings" component={Standings} />
    </Provider>
  </Router>
, document.getElementById('root'));
