import { createAsyncThunk } from '@reduxjs/toolkit'
import * as fflate from 'fflate';
import { base } from "./common";

export const fetchPosts = createAsyncThunk('prices', async () => {
  const compressed = new Uint8Array(
    await fetch(base + '/final.json.gz').then(res => res.arrayBuffer())
  );

  const decompressed = fflate.decompressSync(compressed);
  const origText = fflate.strFromU8(decompressed);
  return JSON.parse(origText);
})
