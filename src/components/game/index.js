import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import classNames from 'classnames';
import { HashRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import Bar from "./Bar";
import Drawer from './Drawer';
import Links from './Links';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}))

export default props => {
  const classes = useStyles()
  const { basename } = props;
  const { open } = useSelector(state => state.configReducer)
  const { links, linkObj, rightNav } = props

  let drawer;

  if (links !== undefined) {
    drawer = links.map(d => (
      <Links key={d.section} title={d.section} charts={d.items} open={d.open} />
    ))
  }

  if (linkObj !== undefined) {
    drawer = linkObj;
  }

  return (
    <Router basename={basename}>
      <div className={classes.root}>
        <CssBaseline />
        <Bar basename={basename} rightNav={rightNav} />
        <Drawer>
          {drawer}
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {props.children}
        </main>
      </div>
    </Router>
  );
}
