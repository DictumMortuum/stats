import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Route, Link } from "react-router-dom";
import AverageWinningPoints from './components/averageWinningPoints';
import WinsByBoard from './components/winsByBoard';
import WinsByCombination from './components/winsByCombination';
import WinsByCombination2 from './components/winsByCombination2';
import WinsByCountry from './components/winsByCountry';
import WinsByObjectives from './components/winsByObjectives';
import WinsByRounds from './components/winsByRounds';
import WinsByPlayer from './components/winsByPlayer';
import WinsByStars from './components/winsByStars';
import CountryFrequency from './components/countryFrequency';
import BoardFrequency from './components/boardFrequency';
import Sweetspot from './components/sweetspot';
import Resolution from './components/resolution';
import Passive from './components/passive';
import Aggressive from './components/aggressive';
import Generator from './components/generator';
import common from './analysis';

const {countries, boards} = common;

const wins = [{
  'text': 'Wins by player',
  'path': '/scythe/',
  'component': () => <WinsByPlayer {...common} />
}, {
  'text': 'Average winning points',
  'path': '/scythe/average/',
  'component': () => <AverageWinningPoints {...common} />
}, {
  'text': 'Player sweetspot',
  'path': '/scythe/sweetspot/',
  'component': () => <Sweetspot {...common} />
}, {
  'text': 'Wins by country',
  'path': '/scythe/country/',
  'component': () => <WinsByCountry {...common} />
}, {
  'text': 'Wins by objectives',
  'path': '/scythe/objectives/',
  'component': () => <WinsByObjectives {...common} />
}, {
  'text': 'Wins by rounds',
  'path': '/scythe/rounds/',
  'component': () => <WinsByRounds {...common} />
}, {
  'text': 'Wins by board',
  'path': '/scythe/board/',
  'component': () => <WinsByBoard {...common} />
}, {
  'text': 'Wins by stars',
  'path': '/scythe/stars/',
  'component': () => <WinsByStars {...common} />
}];

const frequencies = [{
  'text': 'Country frequency',
  'path': '/scythe/country/frequency/',
  'component': () => <CountryFrequency {...common} />
}, {
  'text': 'Board frequency',
  'path': '/scythe/board/frequency/',
  'component': () => <BoardFrequency {...common} />
}];

const windgambit = [{
  'text': 'Resolution tiles',
  'path': '/scythe/resolution/',
  'component': () => <Resolution {...common} />
}, {
  'text': 'Aggressive tiles',
  'path': '/scythe/windgambit/aggressive/',
  'component': () => <Aggressive {...common} />
}, {
  'text': 'Passive tiles',
  'path': '/scythe/windgambit/passive/',
  'component': () => <Passive {...common} />
}];

const generator = [{
  'text': 'Generator',
  'path': '/scythe/generator/',
  'component': () => <Generator {...common} />
}];

const countryCombination = countries.map(c => {
  const Country = WinsByCombination(c);

  return {
    'text': 'Wins by ' + c,
    'path': '/scythe/' + c + '/',
    'component': () => <Country {...common} />
  };
});

const boardCombination = boards.map(c => {
  const Board = WinsByCombination2(c);

  return {
    'text': 'Wins by ' + c,
    'path': '/scythe/' + c + '/',
    'component': () => <Board {...common} />
  };
});

class Links extends React.Component {
  state = {
    open: this.props.open || false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {title, charts} = this.props;

    return (
      <List
        component="nav"
        subheader={
          <ListItem onClick={this.handleClick} button>
            <ListItemText secondary={<b>{title}</b>} />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        }
      >
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        {charts.map(({path, text}) => (
          <Link key={path} to={path} style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </Collapse>
      </List>
    );
  };
};

const ChartLinks = () => (
  <div>
    <Links charts={wins} title={"General Stats"} key={"Wins"} open={true} />
    <Divider />
    <Links charts={windgambit} title={"Wind Gambit"} key={"Wind Gambit"} />
    <Divider />
    <Links charts={frequencies} title={"Frequencies"} key={"Frequencies"} />
    <Divider />
    <Links charts={countryCombination} title={"Country Combinations"} key={"Country combinations"} />
    <Divider />
    <Links charts={boardCombination} title={"Board Combinations"} key={"Board combinations"} />
    <Divider />
    <Links charts={generator} title={"Tools"} key={"Generator"} />
  </div>
);

const ChartContent = () => (
  [...wins, ...frequencies, ...windgambit, ...countryCombination, ...boardCombination, ...generator].map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {ChartContent, ChartLinks};