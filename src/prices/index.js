import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import LandingPage from './LandingPage';
import BoardgamePage from './BoardgamePage';
import CartPage from './CartPage';
import SearchPage from './SearchPage';
import WishlistPage from './WishlistPage';
import { fetchAllPrices } from './api/prices';
import { fetchStores } from './api/stores';
import { fetchDate } from './api/date';
import GeeklistPage from './GeeklistPage';

export default () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPrices())
    dispatch(fetchStores())
    dispatch(fetchDate())
  }, [])

  return (
    <Switch >
      <Route path={`${url}/`} exact>
        <LandingPage />
      </Route>
      <Route path={`${url}/cart`} exact>
        <CartPage />
      </Route>
      <Route path={`${url}/search`} exact>
        <SearchPage />
      </Route>
      <Route path={`${url}/wishlist`} exact>
        <WishlistPage />
      </Route>
      <Route path={`${url}/wishlist/:username`}>
        <WishlistPage />
      </Route>
      <Route path={`${url}/geeklist/:geeklist_id`}>
        <GeeklistPage />
      </Route>
      <Route path={`${url}/item/:boardgame_id`}>
        <BoardgamePage />
      </Route>
    </Switch>
  )
}
