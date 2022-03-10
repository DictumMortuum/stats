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

export default () => {
  const classes = useStyles();
  const {stock, stocks} = useSelector(state => state.pricesReducer)
  const dispatch = useDispatch();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="stock-select-label">Stock</InputLabel>
      <Select
        labelId="stock-select-label"
        id="stock-select"
        value={stock}
        onChange={(event) => {
          dispatch({
            type: "SET_STOCK",
            stock: event.target.value
          })
        }}
      >
        {stocks.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
      </Select>
    </FormControl>
  )
}