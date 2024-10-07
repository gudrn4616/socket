import { getGameAssets } from "../init/assets.js";

const userItems = {};

export const getItemScore = (userId, itemId, stageId) => {
  const { items, itemUnlocks } = getGameAssets();
  const item = items.data.find(item => item.id === Number(itemId));
  const itemList = itemUnlocks.data.find(data => data.stageId === Number(stageId));
  
  const isInItem = itemList.items.includes(Number(itemId));

  if (item && isInItem) {
    if (!userItems[userId]) {
      userItems[userId] = [];
    }
    userItems[userId].push(itemId);
    return { status: 'success', score: item.score };
  } else if (!item) {
    return { status: 'fail', message: 'Item not found' };
  } else {
    return { status: 'fail', score: 0 };
  }
};

export const getItemUnlock = (stageId) => {
  const { data } = getGameAssets().itemUnlocks;
  let stage = data.find(stage => stage.stageId === Number(stageId));
  if (!stage) {
    stage = data[data.length - 1];
  }
  return { status: 'success', items: stage.items };
}