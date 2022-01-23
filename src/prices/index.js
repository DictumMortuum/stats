import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
  const {data, boardgames} = useSelector(state => state.pricesReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <Switch >
      <Route key={-1} path="/prices" exact component={
        () => <LandingPage data={data} />
      } />
      <Route key={-2} path="/prices/cart" exact component={
        () => <CartPage />
      } />
      <Route key={-3} path="/prices/all" exact component={
        () => <PricesPage />
      } />
      <Route key={-4} path="/prices/search" exact component={
        () => <SearchPage />
      } />
      {boardgames.map((tile => (
        <Route key={tile.id} path={"/prices/item/" + tile.boardgame_id} exact component={() => <BoardgamePage data={data} />} />
      )))}
    </Switch>
  )
}
