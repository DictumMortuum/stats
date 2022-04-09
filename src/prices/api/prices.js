import { createAsyncThunk } from '@reduxjs/toolkit'
import * as fflate from 'fflate';
import { base } from "./common";

export const fetchAllPrices = createAsyncThunk('prices', async () => {
  const compressed = new Uint8Array(
    await fetch(base + '/rest/v1/prices.json.gz').then(res => res.arrayBuffer())
  );

  const decompressed = fflate.decompressSync(compressed);
  const origText = fflate.strFromU8(decompressed);
  return JSON.parse(origText);
})

export const fetchBoardgame = boardgame_id => {
  return fetch(base + '/rest/v1/boardgames/' + boardgame_id + '/boardgame.json').then(res => res.json())
}

export const fetchPrices = boardgame_id => {
  return fetch(base + '/rest/v1/boardgames/' + boardgame_id + '/prices.json').then(res => res.json())
}

export const fetchPrice = price_id => {
  return fetch(base + '/rest/v1/prices/' + price_id + '.json').then(res => res.json())
}
