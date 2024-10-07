import { getGameAssets } from "../init/assets.js";

// 사용자 아이템을 저장하는 객체입니다.
const userItems = {};

// getItemScore 함수는 사용자 ID, 아이템 ID, 스테이지 ID를 받아서 아이템 점수를 반환합니다.
export const getItemScore = (userId, itemId, stageId) => {
  // 게임 자산에서 아이템과 아이템 잠금 해제 데이터를 가져옵니다.
  const { items, itemUnlocks } = getGameAssets();
  
  // 아이템 ID에 해당하는 아이템을 찾습니다.
  const item = items.data.find(item => item.id === Number(itemId));
  
  // 스테이지 ID에 해당하는 아이템 목록을 찾습니다.
  const itemList = itemUnlocks.data.find(data => data.stageId === Number(stageId));
  
  // 아이템 목록에 아이템 ID가 포함되어 있는지 확인합니다.
  const isInItem = itemList.items.includes(Number(itemId));

  if (item && isInItem) {
    // 사용자 ID에 해당하는 아이템 목록이 없으면 초기화합니다.
    if (!userItems[userId]) {
      userItems[userId] = [];
    }
    // 사용자 ID에 해당하는 아이템 목록에 아이템 ID를 추가합니다.
    userItems[userId].push(itemId);
    // 성공 상태와 아이템 점수를 반환합니다.
    return { status: 'success', score: item.score };
  } else if (!item) {
    // 아이템을 찾을 수 없는 경우 실패 상태와 메시지를 반환합니다.
    return { status: 'fail', message: 'Item not found' };
  } else {
    // 아이템이 목록에 없는 경우 실패 상태와 점수 0을 반환합니다.
    return { status: 'fail', score: 0 };
  }
};

// getItemUnlock 함수는 스테이지 ID를 받아서 해당 스테이지에서 잠금 해제된 아이템 목록을 반환합니다.(STAGE의 아이템 반환)
export const getItemUnlock = (stageId) => {
  // 게임 자산에서 아이템 잠금 해제 데이터를 가져옵니다.
  const { data } = getGameAssets().itemUnlocks;
  
  // 스테이지 ID에 해당하는 스테이지를 찾습니다.
  let stage = data.find(stage => stage.stageId === Number(stageId));
  
  // 스테이지를 찾을 수 없는 경우 마지막 스테이지를 사용합니다.
  if (!stage) {
    stage = data[data.length - 1];
  }
  
  // 성공 상태와 해당 스테이지의 아이템 목록을 반환합니다.
  return { status: 'success', items: stage.items };
}