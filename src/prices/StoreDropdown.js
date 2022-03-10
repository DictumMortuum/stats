import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

export default props => {
  const classes = useStyles();
  const { stores } = props;
  const { store } = useSelector(state => state.pricesReducer)
  const dispatch = useDispatch();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="store-select-label">Store</InputLabel>
      <Select
        labelId="store-select-label"
        id="store-select"
        value={store}
        onChange={(event) => {
          dispatch({
            type: "SET_STORE",
            store: event.target.value
          })
        }}
      >
        <MenuItem key={-1} value="">None</MenuItem>
        {stores.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
      </Select>
    </FormControl>
  )
}
