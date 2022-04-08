import { createAsyncThunk } from '@reduxjs/toolkit'
import { base } from "./common";

export const fetchHistory = id => {
  return createAsyncThunk('history', async () => {
    return await fetch(base + '/rest/v1/prices/' + id + '/history.json').then(res => res.json())
  })
}
