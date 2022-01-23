import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import StockToggle from './StockToggle';
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
  const { component, data } = props;

    return (
    <Grid container className={classes.root} alignContent="center" alignItems="center">
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Breadcrumbs className={classes.title} />
          <SearchInput />
          <Badge className={classes.margin} badgeContent={search_results.length} color="secondary" max={9999}>
            <Link to={"/prices/search"} style={{ color: "white" }}>
              <SearchIcon />
            </Link>
          </Badge>
          <Badge className={classes.margin} badgeContent={json.length} color="secondary" max={9999}>
            <Link to={"/prices/all"} style={{ color: "white" }}>
              <PriceIcon />
            </Link>
          </Badge>
          <Badge badgeContent={cart_show.length} color="secondary" max={9999}>
            <Link to={"/prices/cart"} style={{ color: "white" }}>
              <ShoppingCartIcon />
            </Link>
          </Badge>
        </Toolbar>
      </AppBar>

      <Grid item xs={12} className={classes.content}>
        <Grid container spacing={2} alignContent="center" alignItems="center">
          <Grid item md={2} xs={6}>
            <StoreDropdown />
          </Grid>
          <Grid item md={10} xs={6}>
            <StockToggle />
          </Grid>
          <Grid item xs={12}>
            {data.length > 0 ? component : <Nothing spinner={spinner} />}
          </Grid>
        </Grid>
      </Grid>

      <Toolbar>
        <Typography variant="body1" color="inherit">
          © 2022 Dimitris Raviolos - Last update: {toDate(data)}
        </Typography>
      </Toolbar>
    </Grid>
  )
}
