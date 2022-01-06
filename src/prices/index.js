import React from 'react';
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LandingPage from './LandingPage';
import BoardgamePage from './BoardgamePage';

export default () => {
  const {data, grouped, boardgames} = useSelector(state => state.pricesReducer)

  return (
    <Switch>
      <Route key={0} path="/prices" exact component={() => <LandingPage data={data} grouped={grouped} />} />
      {boardgames.map((tile => (
        <Route key={tile.id} path={"/prices/" + tile.boardgame_id} exact component={() => <BoardgamePage data={data} {...tile} />} />
      )))}
    </Switch>
  )
}
