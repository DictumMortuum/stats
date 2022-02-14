import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";

export default props => {
  const [open, setOpen] = useState(props.open || false);
  const {title, charts} = props;

  return (
    <List
      component="nav"
      subheader={
        <ListItem onClick={() => { setOpen(!open) }} button>
          <ListItemText secondary={<b>{title}</b>} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      }
    >
    <Collapse in={open} timeout="auto" unmountOnExit>
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
}
