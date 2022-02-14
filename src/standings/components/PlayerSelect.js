import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { player, players } = useSelector(state => state.standingsReducer)

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel className={classes.text} id="player-select-label">Player</InputLabel>
      <Select
        className={classes.text}
        labelId="player-select-label"
        id="player-select"
        value={player}
        color="secondary"
        onChange={event => {
          dispatch({
            type: "SET_PLAYER",
            player: event.target.value
          })
        }}
      >
        <MenuItem key={-1} value="">None</MenuItem>
        {players.map(d => <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>)}
      </Select>
    </FormControl>
  )
}
