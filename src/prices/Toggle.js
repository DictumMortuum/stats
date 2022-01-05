import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default props => {
  return (
    <FormControl style={{marginRight: 20}} component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={
            <Switch
              checked={props.checked}
              onChange={props.handleChange}
              color="default"
              name="checked"
            />
          }
          label="in stock?"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
}
