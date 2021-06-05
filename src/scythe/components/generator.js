import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import Combinatorics from 'js-combinatorics';

const shuffle = arr => arr.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);

const container = ({boards, countries, data, winscutoff = 1, filters = [], playernumber = 4}) => {

  const info = data.filter(d => d.board !== undefined && d.country !== undefined);

  const combinations = (() => {
    let temp = [];

    countries.forEach(country => {
      boards.forEach(board => {
        let n = info.filter(d => board === d.board && country === d.country).length;

        if (n <= winscutoff) {
          temp.push([board, country]);
        }
      });
    });

    return shuffle(temp).slice(0, 30);
  })();

  const hashmap = (() => {
    let hash = {};

    [...boards, ...countries].forEach(c => {
      hash[c] = 0;
    });

    return hash;
  })();

  const impossible = col => {
    let hash = {...hashmap};

    col.forEach(([board, country]) => {
      hash[board]++;
      hash[country]++;
    });

    for (let key in hash) {
      if (hash[key] > 1) {
        return 0;
      }
    }

    let retval = 1;

    filters.forEach(key => {
      if (hash[key] === 0) {
        retval = 0;
      }
    });

    return retval;
  };

  return Combinatorics.bigCombination(combinations, playernumber).filter(impossible);
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  result: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    minHeight: 100
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class Generator extends React.Component {
  state = {
    filters: [],
    total: "",
    i: 0,
    game: [],
    games: {},
    playernumber: 3,
    winscutoff: 1
  };

  handleFilters = event => {
    this.setState({ filters: event.target.value });
  };

  handlePlayers = event => {
    this.setState({ playernumber: event.target.value });
  };

  handleCutoff = event => {
    this.setState({ winscutoff: event.target.value });
  };

  handleSubmit = () => {
    const games = container({...this.state, ...this.props});

    console.log(games);

    if (games.length !== 0) {
      this.setState({
        i: 0,
        games,
        total: "Found " + games.length + " combinations.",
        game: games[0]
      });
    } else {
      this.setState({
        total: "There are no combinations with this setup. Please try again."
      });
    }
  };

  handleNext = () => {
    const {i, games} = this.state;

    this.setState({
      game: games[i],
      i: i + 1,
    });
  }

  render() {
    const {classes, countries, boards} = this.props;

    return (
      <div>
        <Card>
          <CardContent className={classes.card}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="players-simple">Player #</InputLabel>
              <Select value={this.state.playernumber} onChange={this.handlePlayers}>
                {[2, 3, 4, 5, 6, 7].map(d => (<MenuItem key={d} value={d}>{d} players</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="winscutoff-simple">Maximum wins</InputLabel>
              <Select value={this.state.winscutoff} onChange={this.handleCutoff}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(d => (<MenuItem key={d} value={d}>{d} wins</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-chip">Must Include</InputLabel>
              <Select
                multiple
                value={this.state.filters}
                onChange={this.handleFilters}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {[...countries, ...boards].map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Generate</Button>
            <Button variant="outlined" onClick={this.handleNext}>Next</Button>
            <Typography variant="h5" component="h2">
              {this.state.total}
            </Typography>
          </CardActions>
        </Card>
        <div className={classes.result}>
          <p>Using the generator: TL;DR - Select the number of players and press "generate".</p>
          <h3>Maximum Wins</h3>
          <p>The generator uses the [board, country] combinations that have zero recorded wins to generate a game.</p>
          <p>However, those choices are not always enough to generate a game. Thus, if you can't generate a game, you can use this dropdown to also include combinations with more than 0 recorded wins.</p>
          <h3>Must Include</h3>
          <p>Use this dropdown to select boards and/or countries that you absolutely want in the results (e.g. if a player wants to play a specific country)</p>
          <h3>Next</h3>
          <p>The generator will inform you of how many combinations it has generated. If you don't like a particular combination, use the next button to see the next one.</p>
        </div>
        <Paper className={classes.result}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Board</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.game.map(c => (
                <TableRow key={c[0] + c[1]}>
                  <TableCell>{c[0]}</TableCell>
                  <TableCell>{c[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

Generator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Generator);
