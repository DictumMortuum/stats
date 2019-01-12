import {
  KEMET_INIT,
  KEMET_CONFIG
} from '../actions/types';

export const kemetInit = () => ({
  type: KEMET_INIT
});

export const kemetConfig = config => ({
  type: KEMET_CONFIG,
  config
});
