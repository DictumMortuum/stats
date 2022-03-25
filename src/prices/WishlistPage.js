import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import BoardgameCard from './BoardgameCard';
import GenericPage from './GenericPage';
import { paginate, changePage, useParams } from '../common';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import BggInput from './BggInput';

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

const Spinner = () => (
  <Grid container alignContent="center" alignItems="center" direction="column">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>
)

export default props => {
  const page_size = 40
  const history = useHistory();
  const { page } = useParams();
  const { wishlist, spinner } = useSelector(state => state.pricesReducer)
  const filtered = props.data.filter(d => wishlist.includes(d.boardgame_id))
  const grouped = pricesToGroups(filtered)
  const page_data = paginate(grouped, page_size, page)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <GenericPage
      data={props.data}
      component={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BggInput />
          </Grid>
          <Grid item xs={12}>
            <Pagination variant="outlined" shape="rounded" count={parseInt(grouped.length/page_size)} page={page} onChange={changePage("/prices", history)} />
          </Grid>
          { spinner && <Spinner /> }
          { !spinner && page_data.map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={3}>
              <BoardgameCard {...tile} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Pagination variant="outlined" shape="rounded" count={parseInt(grouped.length/page_size)} page={page} onChange={changePage("/prices", history)} />
          </Grid>
        </Grid>
      }
    />
  )
}
