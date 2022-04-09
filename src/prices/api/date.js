import { createAsyncThunk } from '@reduxjs/toolkit'
import { base } from "./common";

export const fetchDate = createAsyncThunk('date', async () => {
  return await fetch(base + '/rest/v1/date.json').then(res => res.json())
})
