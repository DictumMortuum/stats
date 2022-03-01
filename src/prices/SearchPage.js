import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import PriceCard from './PriceCard';
import GenericPage from './GenericPage';
import { useSelector } from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import { paginate } from '../common';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const emptySearch = (history, dispatch) => {
  history.push("/prices")
  dispatch({
    type: "SEARCH",
    payload: ""
  })
}

export default props => {
  const page_size = 12
  const history = useHistory();
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { search_results, search_term } = useSelector(state => state.pricesReducer)
  const page_data = paginate(search_results, page_size, page)

  return (
    <GenericPage
      data={page_data}
      component={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Pagination count={parseInt(search_results.length/page_size)} page={page} onChange={(event, value) => setPage(value)} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="inherit">
              Showing results for the search term " {search_term} ". <Button onClick={() => emptySearch(history, dispatch)}>Empty Search Term</Button>
            </Typography>
          </Grid>
          {page_data.map((tile) => (
            <Grid key={tile.id} item xs={12} md={6} lg={3}>
              <PriceCard boardgame={tile} self_ref={true} />
            </Grid>
          ))}
        </Grid>
      }
    />
  )
}
