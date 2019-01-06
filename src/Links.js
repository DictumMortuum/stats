import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";

class Links extends React.Component {
  state = {
    open: this.props.open || false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {title, charts} = this.props;

    return (
      <List
        component="nav"
        subheader={
          <ListItem onClick={this.handleClick} button>
            <ListItemText secondary={<b>{title}</b>} />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        }
      >
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        {charts.map(({path, text}) => (
          <Link key={path} to={path} style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </Collapse>
      </List>
    );
  };
};

export default Links;
