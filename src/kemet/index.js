import React from 'react';
import { Route, Switch } from 'react-router-dom';
import KemetLogo from './logo.jpg';
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

export const links = [{
  "section": "General Stats",
  "open": true,
  "items": [{
    'text': 'Standings',
    'path': '/',
  }, {
    'text': 'Best player',
    'path': '/players/best',
  }, {
    'text': 'Player VP by color',
    'path': '/players/color/vp',
  }, {
    'text': 'Player picks by color',
    'path': '/players/color/picks',
  }]
}, {
  "section": "Tile Stats",
  "items": [{
    'text': 'Best tiles',
    'path': '/tiles/best',
  },
  ...colors.map(c => ({
    'text': c + ' tiles by VP',
    'path': '/tiles/vp/' + c + '/',
  })),
  ...colors.map(c => ({
    'text': c + ' tiles by position',
    'path': '/tiles/position/' + c + '/',
  })),
  ...colors.map(c => ({
    'text': c + ' tiles by # of picks',
    'path': '/tiles/picks/' + c + '/',
  }))]
}]

export default () => (
  <Switch>
    <Route exact path="/">
      <Standings desc={<Typography variant="body1" gutterBottom>
        The game can be played at most with 5 players, so there are 5 positions. The bars represent these positions, so for a certain player the first bar represents how many times he came first, the second bar how many he came second, etc.
      </Typography>}/>
    </Route>
    <Route exact path="/players/best">
      <BestPlayer desc={<Typography variant="body1" gutterBottom>
        This is the sum of all the positions that the player obtained, divided by the number of games he participated in.
        Less is better, it means that the player got 1st place more often.
      </Typography>}/>
    </Route>
    <Route exact path="/players/color/vp">
      <PlayerVPByColor desc={<Typography variant="body1" gutterBottom>
        This chart measures the ability of a player to translate a certain color to victory points. Each bar is color coded and represents the tiles of the appropriate color; it measures the average accumulated victory points for all tiles of the same color for a certain player.
      </Typography>}/>
    </Route>
    <Route exact path="/players/color/picks">
      <PlayerPicksByColor desc={<Typography variant="body1" gutterBottom>
        This chart measures the favorite color of each player.
      </Typography>}/>
    </Route>
    <Route exact path="/tiles/best">
      <BestTiles desc={
        <div>
          <Typography variant="body1" gutterBottom>Grey bar is the average position the player that picked this tile achieved - lower is better.</Typography>
          <Typography variant="body1" gutterBottom>Red bar is the average victory points the player that picked this tile achieved - higher is better.</Typography>
          <Typography variant="body1" gutterBottom>The tiles are ordered first by the average position and then by the average VP accumulation.</Typography>
        </div>}
      />
    </Route>
    {colors.map(c => (
      <Route key={c + "vp"} exact path={`/tiles/vp/${c}/`}>
        <TilesByVP color={c} desc={
          <Typography variant="body1" gutterBottom>This chart measures the average victory points accumulated for {c} tiles by all players.</Typography>
        }/>
      </Route>
    ))}
    {colors.map(c => (
      <Route key={c + "pos"} exact path={`/tiles/position/${c}/`}>
        <TilesByPosition color={c} desc={
          <Typography variant="body1" gutterBottom>This chart measures the average position a player had attained when he picked a {c} tile.</Typography>
        }/>
      </Route>
    ))}
    {colors.map(c => (
      <Route key={c + "pick"} exact path={`/tiles/picks/${c}/`}>
        <TilesByPicks color={c} desc={
          <Typography variant="body1" gutterBottom>This chart measures how many times {c} tiles where picked by all players.</Typography>
        }/>
      </Route>
    ))}
  </Switch>
)

export {KemetLogo};
