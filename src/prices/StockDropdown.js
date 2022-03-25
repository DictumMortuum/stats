import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams } from '../common';

export default () => {
  const { stock, stocks } = useSelector(state => state.pricesReducer)
  const { stock: url_stock, has_stock } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!has_stock) {
      return
    }

    const state = stocks[url_stock]
    if (state === "") {
      return
    }

    dispatch({
      type: "SET_STOCK",
      stock: state
    })
  }, [stocks, url_stock]);

  return (
    <FormControl variant="outlined" fullWidth>
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
