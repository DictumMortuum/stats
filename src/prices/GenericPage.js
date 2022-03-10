import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import StockDropdown from './StockDropdown';
import StoreDropdown from './StoreDropdown';
import Breadcrumbs from './Breadcrumbs';
import PriceIcon from '@material-ui/icons/LocalOffer';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import EmptyImg from './cartoff.svg';
import SearchInput from './SearchInput';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

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
              <SearchIcon />
            </Link>
          </Badge>
          <Badge className={classes.margin} badgeContent={json.length} color="secondary" max={99999}>
            <Link to={"/prices/all"} style={{ color: "white" }}>
              <PriceIcon />
            </Link>
          </Badge>
          <Badge badgeContent={cart_show.length} color="secondary" max={99999}>
            <Link to={"/prices/cart"} style={{ color: "white" }}>
              <ShoppingCartIcon />
            </Link>
          </Badge>
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
            © 2022 Dimitris Raviolos - v0.1.8 - Last update: {toDate(data)}
          </Typography>
        </Toolbar>
      </Grid>
    </Grid>
  )
}
