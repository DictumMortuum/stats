import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import StockDropdown from './StockDropdown';
import StoreDropdown from './StoreDropdown';
import Breadcrumbs from './Breadcrumbs';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import EmptyImg from './cartoff.svg';
import SearchInput from './SearchInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import {
  Bookmark,
  ShoppingCart,
  LocalOffer,
  Search
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#d8dee9',
    fontFamily: "sans",
  },
  appbar: {
    marginBottom: 5
  },
  content: {
    minHeight: '90vh',
    padding: 10
  },
  margin: {
    marginRight: 20
  }
}));

const toDate = data => data.length > 0 ? new Date(data[0].cr_date).toLocaleDateString('el-GR') : ""

const Nothing = props => (
  <Grid container alignContent="center" alignItems="center" direction="column">
    <Grid item xs={12}>
      {props.spinner ? <CircularProgress /> : <Typography variant="body1" color="inherit"><img style={{ height: 300 }} alt="" src={EmptyImg} /></Typography>}
    </Grid>
  </Grid>
)

// https://caiorss.github.io/bookmarklet-maker/
// var raw = window.location.toString().split("/")[4]
// var id = parseInt(raw)

// if (isNaN(id)) {
//   alert("Could not find a boardgame id. Please navigate to a boardgame page.")
// } else {
//   var url = "https://stats.dictummortuum.com/#/prices/item/" + id + "?stock=1"
//   window.open(url, '_blank')
// }

/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

export default props => {
  const classes = useStyles();
  const { data : json, cart_show, search_results, spinner } = useSelector(state => state.pricesReducer)
  const { component, data, stores } = props;
  const current_stores = stores === undefined ? [...new Set(json.map(d => d.store_name))].sort() : stores;

  return (
    <Grid container className={classes.root} alignContent="center" alignItems="center">
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Breadcrumbs className={classes.title} />
          <SearchInput />
          <Badge className={classes.margin} badgeContent={search_results.length} color="secondary" max={99999}>
            <Link to={"/prices/search"} style={{ color: "white" }}>
              <Search />
            </Link>
          </Badge>
          <Badge className={classes.margin} badgeContent={json.length} color="secondary" max={99999}>
            <Link to={"/prices/all"} style={{ color: "white" }}>
              <LocalOffer />
            </Link>
          </Badge>
          <Badge badgeContent={cart_show.length} color="secondary" max={99999}>
            <Link to={"/prices/cart"} style={{ color: "white" }}>
              <ShoppingCart />
            </Link>
          </Badge>
          <a style={{ color: "white", marginLeft: 20 }} href="javascript:(function()%7Bvar%20raw%20%3D%20window.location.toString().split(%22%2F%22)%5B4%5D%0Avar%20id%20%3D%20parseInt(raw)%0A%0Aif%20(isNaN(id))%20%7B%0A%20%20alert(%22Could%20not%20find%20a%20boardgame%20id.%20Please%20navigate%20to%20a%20boardgame%20page.%22)%0A%7D%20else%20%7B%0A%20%20var%20url%20%3D%20%22https%3A%2F%2Fstats.dictummortuum.com%2F%23%2Fprices%2Fitem%2F%22%20%2B%20id%20%2B%20%22%3Fstock%3D1%22%0A%20%20window.open(url%2C%20'_blank')%20%0A%7D%7D)()%3B">
            <Bookmark />
            <span style={{ display: "none" }}>Boardgame Prices</span>
          </a>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Grid item xs={12} className={classes.content}>
          <Grid container spacing={2} alignContent="center" alignItems="center">
            <Grid item xs={6}>
              <StoreDropdown stores={current_stores} />
            </Grid>
            <Grid item xs={6}>
              <StockDropdown />
            </Grid>
            <Grid item xs={12}>
              {data.length > 0 ? component : <Nothing spinner={spinner} />}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Grid item xs={12}>
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © 2022 Dimitris Raviolos - v0.1.9 - Last update: {toDate(data)}
          </Typography>
        </Toolbar>
      </Grid>
    </Grid>
  )
}
