import React from 'react';
import { useDispatch } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import SearchButton from './SearchButton';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(0.5),
  },
  root: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
  }
}));

const onChange = dispatch => event => dispatch({
  type: "SET_SEARCH_TERM",
  payload: event.target.value,
})

const Component = props => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        placeholder="Search..."
        className={classes.input}
        fullWidth
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChange(dispatch)}
        endAdornment={<SearchButton />}
      />
    </Paper>
  )
}

export default Component;
