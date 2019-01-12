import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { kemetConfig } from '../actions';

const mapStateToProps = state => ({
  ...state.kemetReducer
});

const mapDispatchToProps = {
  handleConfig: kemetConfig
};

class Element extends React.Component {
  handleChange = event => {
    this.props.handleConfig({
      perPlayer: event.target.checked
    });
  }

  render() {
    const {config} = this.props;

    return (
      <ListItem>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={config.perPlayer}
                onChange={this.handleChange}
                value={config.perPlayer}
                color="primary"
              />
            }
            label="Stats per player"
          />
        </FormGroup>
      </ListItem>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Element);
