import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import LandingPage from './LandingPage';
import BoardgamePage from './BoardgamePage';
import CartPage from './CartPage';
import PricesPage from './PricesPage';
import SearchPage from './SearchPage';
import { createAsyncThunk } from '@reduxjs/toolkit'
import * as fflate from 'fflate';

const fetchPosts = createAsyncThunk('posts/fetchPrices', async () => {
  const compressed = new Uint8Array(
    await fetch('https://raw.githubusercontent.com/DictumMortuum/json-api/master/prices.json.gz').then(res => res.arrayBuffer())
  );

  const decompressed = fflate.decompressSync(compressed);
  const origText = fflate.strFromU8(decompressed);
  return JSON.parse(origText);
})

export default () => {
  const { url } = useRouteMatch();
  const { data } = useSelector(state => state.pricesReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <Switch >
      <Route path={`${url}/`} exact>
        <LandingPage data={data} />
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
      <Route path={`${url}/item/:boardgame_id`}>
        <BoardgamePage data={data} />
      </Route>
    </Switch>
  )
}
