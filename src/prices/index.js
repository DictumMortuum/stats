import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LandingPage from './LandingPage';
import BoardgamePage from './BoardgamePage';
import CartPage from './CartPage';
import PricesPage from './PricesPage';
import { createAsyncThunk } from '@reduxjs/toolkit'

const fetchPosts = createAsyncThunk('posts/fetchPrices', async () => {
  return await fetch('https://raw.githubusercontent.com/DictumMortuum/json-api/master/prices.json').then(res => res.json())
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
      {boardgames.map((tile => (
        <Route key={tile.id} path={"/prices/item/" + tile.boardgame_id} exact component={() => <BoardgamePage data={data} />} />
      )))}
    </Switch>
  )
}
