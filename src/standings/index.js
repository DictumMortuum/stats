import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from 'react-router-dom';
import StandingsImg from './img.jpg';
import Standings from './standings';
import Typography from '@material-ui/core/Typography';


// +--------+--------------------------------+
// |     42 | Tigris & Euphrates             |
// |    822 | Carcassonne                    |
// |  14996 | Ticket to ride: Europe         |
// | 110327 | Lords of Waterdeep             |
// | 127023 | Kemet                          |
// | 163412 | Patchwork                      |
// | 170042 | Raiders of the north sea       |
// | 170216 | Blood rage                     |
// | 173346 | 7 Wonders Duel                 |
// | 183394 | Viticulture essential edition  |
// | 230802 | Azul                           |
// | 236457 | Architects of the west kingdom |
// | 237182 | Root                           |
// | 256916 | Concordia Venus                |
// | 266192 | Wingspan                       |
// | 266810 | Paladins of the West Kingdom   |
// | 271320 | Castles of Burgundy            |
// | 283863 | The Magnificent                |
// | 312484 | Lost ruins of Arnak            |
// +--------+--------------------------------+

const boardgames = [
  "Tigris & Euphrates",
  "Ticket to ride: Europe",
  "Carcassonne",
  "Lords of Waterdeep",
  "Kemet",
  "Patchwork",
  "Raiders of the north sea",
  "Blood rage",
  "7 Wonders Duel",
  "Viticulture essential edition",
  "Azul",
  "Architects of the west kingdom",
  "Root",
  "Concordia Venus",
  "Wingspan",
  "Paladins of the West Kingdom",
  "Castles of Burgundy",
  "The Magnificent",
  "Lost ruins of Arnak",
  "Everdell",
  "Scythe"
]

const wins = [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings dataKey="mu" desc={<Typography variant="body1" gutterBottom>
    For each player, the first column represents μ (mu) and the second σ (sigma), based on the <a href="https://en.wikipedia.org/wiki/TrueSkill">TrueSkill</a> algorithm. <br />
    A player's skill is represented as a normal distribution N characterized by a mean value μ (mu, representing perceived skill) and a variance σ (sigma, representing how "unconfident" test system is in the player's μ value).
  </Typography>}/>
},{
  'text': 'Trueskill',
  'path': '/trueskill',
  'component': () => <Standings dataKey="trueskill" />
},
...boardgames.map((d, i) => ({
  'text': d,
  'path': '/' + i,
  'component': () => <Standings boardgame={d} dataKey="mu" />
}))
];

const StandingsLinks = () => (
  <div>
    <Links charts={wins} title={"Standings"} key={"Wins"} open={true} />
    <Divider />
  </div>
);

const StandingsContent = () => (
  wins.map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {StandingsContent, StandingsLinks, StandingsImg};
