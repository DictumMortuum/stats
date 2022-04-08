import { createAsyncThunk } from '@reduxjs/toolkit'
import { base } from "./common";

export const fetchStores = createAsyncThunk('stores', async () => {
  return await fetch(base + '/rest/v1/stores.json').then(res => res.json())
})
