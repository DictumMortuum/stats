import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  text: {
    color: "#eceff4",
  }
}));

export default props => {
  const classes = useStyles();
  const { players, current_players, setPlayers } = props;

  console.log(players, current_players);

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel className={classes.text} id="player-select-label">Player</InputLabel>
      <Select
        className={classes.text}
        labelId="player-select-label"
        id="player-select"
        value={current_players}
        color="secondary"
        multiple
        onChange={event => {
          console.log(event.target.value)
          setPlayers(event.target.value)
        }}
      >
        <MenuItem key="" value="">None</MenuItem>
        {players.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
      </Select>
    </FormControl>
  )
}
