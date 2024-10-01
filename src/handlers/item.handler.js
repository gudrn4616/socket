import { getItemScore } from '../models/item.model.js';

export const getItemScoreHandler = (userId, payload) => {
  const { itemId } = payload;
  return getItemScore(itemId);
};

