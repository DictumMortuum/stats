import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import LandingPage from './LandingPage';
import BoardgamePage from './BoardgamePage';
import CartPage from './CartPage';
import PricesPage from './PricesPage';
import SearchPage from './SearchPage';
import WishlistPage from './WishlistPage';
import { fetchPosts } from './api/prices';
import { fetchStores } from './api/stores';

export default () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchStores())
  }, [])

  return (
    <Switch >
      <Route path={`${url}/`} exact>
        <LandingPage />
      </Route>
      <Route path={`${url}/cart`} exact>
        <CartPage />
      </Route>
      <Route path={`${url}/all`} exact>
        <PricesPage />
      </Route>
      <Route path={`${url}/search`} exact>
        <SearchPage />
      </Route>
      <Route path={`${url}/wishlist`} exact>
        <WishlistPage />
      </Route>
      <Route path={`${url}/item/:boardgame_id`}>
        <BoardgamePage />
      </Route>
    </Switch>
  )
}
