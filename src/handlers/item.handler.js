import { getGameAssets } from "../init/assets.js";

export const getItemScore = (itemId) => {
  const { items } = getGameAssets();
  const item = items.data.find(item => item.id === Number(itemId));
  if (item) {
    return { status: 'success', score: item.score };
  } else {
    return { status: 'fail', message: 'Item not found' };
  }
};

export const getItemScoreHandler = (userId, payload) => {
  const { itemId } = payload;
  return getItemScore(itemId);
};