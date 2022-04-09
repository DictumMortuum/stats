import { createAsyncThunk } from '@reduxjs/toolkit'
import { base } from "./common";

export const fetchHistory = id => {
  return createAsyncThunk('history', async () => {
    return await fetch(base + '/rest/v1/boardgames/' + id + '/history.json').then(res => res.json())
  })
}

export const fetchPriceHistory = boardgame_id => {
  return fetch(base + '/rest/v1/boardgames/' + boardgame_id + '/history.json').then(res => res.json())
}
