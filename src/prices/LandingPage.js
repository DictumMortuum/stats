import React from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';
import { useDispatch, useSelector } from "react-redux";
import { paginate } from '../common';

const pricesToGroups = data => {
  const rs = [];

  data.map(d => {
    if (rs[d.rank-1] === undefined) {
      rs[d.rank-1] = {
        ...d,
        items: []
      }
    }

    rs[d.rank-1].items.push(d)
    return d
  })

  return rs.filter(d => d.items.length > 0)
}

export default props => {
  const page_size = 21
  const { page } = useSelector(state => state.pricesReducer)
  const dispatch = useDispatch();
  const grouped = pricesToGroups(props.data)
  const page_data = paginate(grouped, page_size, page)

  return (
    <GenericPage
      data={props.data}
      component={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Pagination count={parseInt(grouped.length/page_size)} page={page} onChange={(event, value) => {
              dispatch({
                type: "SET_PAGE",
                page: value
              })
            }} />
          </Grid>
          {page_data.map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={4}>
              <BoardgameCard {...tile} />
            </Grid>
          ))}
        </Grid>
      }
    />
  )
}
