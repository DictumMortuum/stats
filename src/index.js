import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/game';
import { HashRouter, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ScytheContent, { links as scytheLinks, ScytheLogo } from './scythe';
import KemetContent, { links as KemetLinks, KemetLogo } from './kemet';
import DuelContent, { links as duelLinks, DuelLogo } from './duel';
import StandingsContent, { links as StandingsLinks, right as StandingsRight, StandingsLogo } from './standings';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer as kemetReducer } from './reducers/kemet';
import { reducer as duelReducer } from './reducers/duel';
import { reducer as standingsReducer } from './reducers/standings';
import { reducer as configReducer } from './reducers/config';
import { reducer as pricesReducer } from './reducers/prices';
import Infographic from './infographic/year';
import Prices from './prices';
import SecretSanta from './secretsanta';
import TitlebarGridList from './Grid';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  kemetReducer,
  duelReducer,
  standingsReducer,
  configReducer,
  pricesReducer,
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, composedEnhancer)

store.dispatch({
  type: "INIT"
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#5e81ac",
    },
    secondary: {
      main: "#bf616a",
    },
    text: {
      primary: "#2e3440",
    }
  },
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
  <ThemeProvider theme={theme}>
    <HashRouter>
      <Provider store={store}>
        <Route path="/" exact>
          <TitlebarGridList tiles={tileData} />
        </Route>
        <Route path="/scythe">
          <Game basename="scythe" links={scytheLinks}>
            <ScytheContent />
          </Game>
        </Route>
        <Route path="/kemet">
          <Game basename="kemet" links={KemetLinks}>
            <KemetContent />
          </Game>
        </Route>
        <Route path="/duel">
          <Game basename="duel" links={duelLinks}>
            <DuelContent />
          </Game>
        </Route>
        <Route path="/standings">
          <Game basename="standings" linkObj={<StandingsLinks />} rightNav={StandingsRight}>
            <StandingsContent />
          </Game>
        </Route>
        <Route path="/review/:raw_year">
          <Infographic />
        </Route>
        <Route path="/prices">
          <Prices />
        </Route>
        <SecretSanta />
      </Provider>
    </HashRouter>
  </ThemeProvider>
, document.getElementById('root'));
