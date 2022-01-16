import React from 'react';
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LandingPage from './LandingPage';
import BoardgamePage from './BoardgamePage';
import CartPage from './CartPage';
import PricesPage from './PricesPage';

export default () => {
  const {data, boardgames} = useSelector(state => state.pricesReducer)

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
