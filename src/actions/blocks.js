import { FETCH_BLOCKS } from './types';

import blocks from '../fixtures/blocks.json';

export default function fetchBlocks() {
  return {
    type: FETCH_BLOCKS,
    payload: blocks,
  };
}
