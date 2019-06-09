import React from 'react';
import Divider from '@material-ui/core/Divider';
import Links from '../Links';
import { Route } from 'react-router-dom';
import KemetImg from './img.jpg';
import PerPlayer from './components/config';
import Standings from './components/standings';
import TilesByPicks from './components/tilesByPicks';
import TilesByVP from './components/tilesByVP';
import TilesByPosition from './components/tilesByPosition';
import BestTiles from './components/bestTiles';
import PlayerVPByColor from './components/playerVPByColor';
import PlayerPicksByColor from './components/playerPicksByColor';
import Typography from '@material-ui/core/Typography';
import BestPlayer from './components/bestPlayer';

const colors = ['red', 'blue', 'white', 'black'];

const tiles = [{
    'text': 'Best tiles',
    'path': '/tiles/best',
    'component': () => <BestTiles desc={
      <div>
        <Typography variant="body1" gutterBottom>Grey bar is the average position the player that picked this tile achieved - lower is better.</Typography>
        <Typography variant="body1" gutterBottom>Red bar is the average victory points the player that picked this tile achieved - higher is better.</Typography>
        <Typography variant="body1" gutterBottom>The tiles are ordered first by the average position and then by the average VP accumulation.</Typography>
      </div>}
    />
  },
  ...colors.map(c => ({
    'text': c + ' tiles by VP',
    'path': '/tiles/vp/' + c + '/',
    'component': () => <TilesByVP color={c} desc={<Typography variant="body1" gutterBottom>
      This chart measures the average victory points accumulated for {c} tiles by all players.
    </Typography>}/>
  })),
  ...colors.map(c => ({
    'text': c + ' tiles by position',
    'path': '/tiles/position/' + c + '/',
    'component': () => <TilesByPosition color={c} desc={<Typography variant="body1" gutterBottom>
      This chart measures the average position a player had attained when he picked a {c} tile.
    </Typography>}/>
  })),
  ...colors.map(c => ({
    'text': c + ' tiles by # of picks',
    'path': '/tiles/picks/' + c + '/',
    'component': () => <TilesByPicks color={c} desc={<Typography variant="body1" gutterBottom>
      This chart measures how many times {c} tiles where picked by all players.
    </Typography>}/>
  }))
];

const wins = [{
  'text': 'Standings',
  'path': '/',
  'component': () => <Standings desc={<Typography variant="body1" gutterBottom>
    The game can be played at most with 5 players, so there are 5 positions. The bars represent these positions, so for a certain player the first bar represents how many times he came first, the second bar how many he came second, etc.
  </Typography>}/>
}, {
  'text': 'Best player',
  'path': '/players/best',
  'component': () => <BestPlayer desc={<Typography variant="body1" gutterBottom>
    This is the sum of all the positions that the player obtained, divided by the number of games he participated in.
    Less is better, it means that the player got 1st place more often.
  </Typography>}/>
}, {
  'text': 'Player VP by color',
  'path': '/players/color/vp',
  'component': () => <PlayerVPByColor desc={<Typography variant="body1" gutterBottom>
    This chart measures the ability of a player to translate a certain color to victory points. Each bar is color coded and represents the tiles of the appropriate color; it measures the average accumulated victory points for all tiles of the same color for a certain player.
  </Typography>}/>
}, {
  'text': 'Player picks by color',
  'path': '/players/color/picks',
  'component': () => <PlayerPicksByColor desc={<Typography variant="body1" gutterBottom>
    This chart measures the favorite color of each player. 
  </Typography>}/>
}];

const KemetLinks = () => (
  <div>
    <Links charts={wins} title={"General Stats"} key={"Wins"} open={true} />
    <Divider />
    <Links charts={tiles} title={"Tile Stats"} key={"tiles"} open={true} />
    <Divider />
    <PerPlayer />
  </div>
);

const KemetContent = () => (
  [...wins, ...tiles].map(({path, component}) => (
    <Route key={path} path={path} exact component={component} />
  ))
);

export {KemetContent, KemetLinks, KemetImg};
