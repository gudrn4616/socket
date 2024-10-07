import { getItemScore, getItemUnlock } from '../models/item.model.js';

export const getItemScoreHandler = (userId, payload) => {
  const { itemId, stageId } = payload;
  return getItemScore(userId, itemId,stageId);
};

export const getItemUnlockHandler = (userId, payload) => {
  const { stageId } = payload;
  return getItemUnlock(stageId);
}