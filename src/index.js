import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ScytheLinks, ScytheContent, ScytheLogo } from './scythe/Charts';
import { KemetLinks, KemetContent, KemetLogo } from './kemet';
import { DuelLinks, DuelContent, DuelLogo } from './duel';
import { StandingsLinks, StandingsContent, StandingsLogo } from './standings';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer as kemetReducer } from './reducers/kemet';
import { reducer as duelReducer } from './reducers/duel';
import { reducer as standingsReducer } from './reducers/standings';
import { reducer as configReducer } from './reducers/config';
import Infographic from './infographic/year2021';
import TitlebarGridList from './Grid';

const store = createStore(combineReducers({
  kemetReducer,
  duelReducer,
  standingsReducer,
  configReducer,
}));

store.dispatch({
  type: "INIT"
});

const tileData = [
  {
    img: StandingsLogo,
    title: "Standings",
    link: "/standings",
  },
  {
    img: ScytheLogo,
    title: "Scythe",
    link: "/scythe",
  },
  {
    img: KemetLogo,
    title: "Kemet",
    link: "/kemet"
  },
  {
    img: DuelLogo,
    title: "7 Wonders Duel",
    link: "/duel",
  },
];

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path="/" exact component={() => <TitlebarGridList tiles={tileData} />} />
      <Route path="/scythe" component={() => <Game basename="scythe" links={ScytheLinks} content={ScytheContent} />} />
      <Route path="/kemet" component={() => <Game basename="kemet" links={KemetLinks} content={KemetContent} />} />
      <Route path="/duel" component={() => <Game basename="duel" links={DuelLinks} content={DuelContent} />} />
      <Route path="/standings" component={() => <Game basename="standings" links={StandingsLinks} content={StandingsContent} open={false} />} />
      <Route path="/2021" component={() => <Infographic />} />
    </Provider>
  </Router>
, document.getElementById('root'));
