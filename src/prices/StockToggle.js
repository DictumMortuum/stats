import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default () => {
  const toggle = useSelector(state => state.pricesReducer.instock)
  const dispatch = useDispatch();

  return (
    <FormControl style={{marginRight: 20}} component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={
            <Switch
              checked={toggle}
              onChange={() => dispatch({ type: "TOGGLE_STOCK" })}
              color="primary"
              name="checked"
            />
          }
          label={toggle ? "show only items in stock" : "include out-of-stock items"}
          labelPlacement="bottom"
        />
      </FormGroup>
    </FormControl>
  );
}
