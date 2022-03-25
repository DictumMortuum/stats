import React from 'react';
import { useDispatch } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import BggFetch from './BggFetch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1),
  },
}));

const onChange = dispatch => event => dispatch({
  type: "SET_WISHLIST_USERNAME",
  payload: event.target.value,
})

const Component = props => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Paper component="form">
      <InputBase
        className={classes.input}
        variant="outlined"
        fullWidth
        onChange={onChange(dispatch)}
        endAdornment={<BggFetch />}
        placeholder="boardgamegeek username"
      />
    </Paper>
  )
}

export default Component;
